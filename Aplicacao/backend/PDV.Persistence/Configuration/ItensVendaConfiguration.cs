using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PDV.Domain.Entities;

namespace PDV.Persistence.Configuration
{
    public class ItensVendaConfiguration : IEntityTypeConfiguration<ItemVenda>
    {
        public void Configure(EntityTypeBuilder<ItemVenda> builder)
        {
            builder.ToTable("Itens_Venda");
            builder.HasKey("Id");
            builder.Property(I => I.Quantidade).HasColumnType("INTEGER(6)");
            builder.Property(I => I.PrecoUnitario).HasColumnType("DECIMAL(10,2)");
            builder.Property(I => I.Subtotal).HasColumnType("DECIMAL(10,2)");

            builder.HasOne(I => I.Venda)
                .WithMany(V => V.ItensVenda)
                .IsRequired(true)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(I => I.Produto)
                .WithMany(P => P.ItensVenda)
                .IsRequired(true)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}