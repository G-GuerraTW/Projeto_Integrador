using System.Reflection;
using Microsoft.EntityFrameworkCore;
using PDV.Domain.Entities;

namespace PDV.Persistence.Context
{
    public class PDVContext : DbContext
    {
        public PDVContext(DbContextOptions<PDVContext> options) : base(options) {}

        // DbSets para as entidades do banco de dados
        public DbSet<ItemVendaEntity> ItemVendas { get; set; }
        public DbSet<ProdutoEntity> Produtos { get; set; }
        public DbSet<VendaEntity> Vendas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Aplicar configurações de entidades a partir do assembly atual
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}