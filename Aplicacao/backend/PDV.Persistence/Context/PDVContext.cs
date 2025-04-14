using System.Reflection;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PDV.Domain.Entities;
using PDV.Domain.Identity;

namespace PDV.Persistence.Context
{
    public class PDVContext : IdentityDbContext<User, Role, int,
                                                IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
                                                IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public PDVContext(DbContextOptions<PDVContext> options) : base(options) {}
    
        public DbSet<ItemVendaEntity> ItemVendas { get; set; }
        public DbSet<ProdutoEntity> Produtos { get; set; }
        public DbSet<VendaEntity> Vendas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}