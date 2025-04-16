using Microsoft.EntityFrameworkCore;
using PDV.Application.Contracts;
using PDV.Application.Services;
using PDV.Persistence.Context;
using PDV.Persistence.Contracts;
using PDV.Persistence.Repositories;

var builder = WebApplication.CreateBuilder(args);

//Adicionando Serviços
builder.Services.AddCors();
builder.Services.AddControllers()
    .AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Adicionando Scopeds
builder.Services.AddScoped<IGeralPersist, GeralPersist>();
builder.Services.AddScoped<IVendaPersist, VendaPersist>();
builder.Services.AddScoped<IProdutoPersist, ProdutoPersist>();

builder.Services.AddScoped<IVendaService, VendaService>();
builder.Services.AddScoped<IProdutoService, ProdutoService>();


//Configurando Conexão com o Banco
builder.Services.AddDbContext<PDVContext>(options =>
    options.UseSqlite("DATA Source=banco.db")
);
  builder.Services.AddCors(options =>
  {
      options.AddDefaultPolicy(
          policy =>
          {
              policy.WithOrigins("http://localhost:3000") // URL do seu frontend
                    .AllowAnyHeader()
                    .AllowAnyMethod();
          });
  });

  var app = builder.Build();

  // Configure the HTTP request pipeline.
  if (app.Environment.IsDevelopment())
  {
      app.UseSwagger();
      app.UseSwaggerUI(options =>
      {
          options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
          options.RoutePrefix = string.Empty;
      });
  }

  app.UseCors();
  app.MapControllers();
app.UseHttpsRedirection();
app.Run();
