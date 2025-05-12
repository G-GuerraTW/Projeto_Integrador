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
            builder.HasKey(I => I.Id);
            builder.Property(I => I.Quantidade).HasColumnType("INTEGER");
            builder.Property(I => I.PrecoUnitario).HasColumnType("REAL");

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