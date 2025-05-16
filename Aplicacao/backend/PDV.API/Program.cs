using System.Text;
using PDV.Domain.Identity;
using PDV.Persistence.Context;
using Microsoft.OpenApi.Models;
using PDV.Application.Services;
using PDV.Persistence.Contracts;
using PDV.Application.Contracts;
using PDV.Persistence.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

//Adicionando Servi�os
builder.Services.AddCors();
builder.Services.AddControllers()
    .AddNewtonsoftJson(x =>
    {
        x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        x.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
    });
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddEndpointsApiExplorer();

//Configurando Swagger para aceitar autorização via UI
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"JWT Authorization header usando Bearer.
                        Entre com 'Bearer' [espaço] então coloque seu token.
                        Exemplo: 'Bearer 12345abcdefg'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                In = ParameterLocation.Header,
                Name = "Authorization"
            },
            new List<string>()
        }
    });
});

//Adicionando Scopeds Persistencia
builder.Services.AddScoped<IGeralPersist, GeralPersist>();
builder.Services.AddScoped<IVendaPersist, VendaPersist>();
builder.Services.AddScoped<IProdutoPersist, ProdutoPersist>();
builder.Services.AddScoped<IUserPersist, UserPersist>();
builder.Services.AddScoped<IItemVendaPersist, ItemVendaPersist>();

//Adicionando Scopeds Serviços
builder.Services.AddScoped<IVendaService, VendaService>();
builder.Services.AddScoped<IItemVendaService, ItemVendaService>();
builder.Services.AddScoped<IProdutoService, ProdutoService>();
builder.Services.AddScoped<IAccountService, AccountService>();  
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IHistoricoService, HistoricoService>();

//Configurando Identity (Usuário, Senhas, Regras)
builder.Services.AddIdentityCore<User>(options =>
    {
        // Regras para criação de senha
        options.Password.RequireDigit = false;
        options.Password.RequireNonAlphanumeric = true;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequiredLength = 4;
    })
    .AddRoles<Role>()
    .AddRoleManager<RoleManager<Role>>()
    .AddSignInManager<SignInManager<User>>()
    .AddRoleValidator<RoleValidator<Role>>()
    .AddEntityFrameworkStores<PDVContext>() // Usa o EF para armazenar usuários
    .AddDefaultTokenProviders();

//Configurando Autenticação JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])
            ),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

//Configurando Conex�o com o Banco
builder.Services.AddDbContext<PDVContext>(options =>
    options
        .UseSqlite("DATA Source=banco.db")
        .EnableSensitiveDataLogging()
        .LogTo(Console.WriteLine, LogLevel.Debug)
);

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

    // Inicializa o banco recriando do zero
    var dbContext = app.Services.CreateScope().ServiceProvider.GetRequiredService<PDVContext>();
    dbContext.Database.EnsureDeleted();
    dbContext.Database.EnsureCreated();

    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });
}
app.MapControllers();
app.UseHttpsRedirection();
app.Run();
