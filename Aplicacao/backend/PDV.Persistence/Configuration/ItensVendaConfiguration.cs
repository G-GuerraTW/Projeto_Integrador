using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PDV.Domain.Entities;

namespace PDV.Persistence.Configuration
{
    public class ItensVendaConfiguration : IEntityTypeConfiguration<ItemVendaEntity>
    {
        public void Configure(EntityTypeBuilder<ItemVendaEntity> builder)
        {
            builder.ToTable("Itens_Venda");
            builder.HasKey(i => new { i.VendaId, i.ProdutoId });
        
            builder.Property(i => i.Quantidade).HasColumnType("INTEGER");
        
            builder.HasOne(i => i.Venda)
                .WithMany(v => v.ItensVenda)
                .HasForeignKey(i => i.VendaId)         // <<< explicita a FK
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        
            builder.HasOne(i => i.Produto)
                .WithMany(p => p.ItensVenda)
                .HasForeignKey(i => i.ProdutoId)       // <<< explicita a FK
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}