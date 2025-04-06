
using PDV.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace PDV.Persistence.Configuration
{
    public class VendaConfiguration : IEntityTypeConfiguration<VendaEntity>
    {
        public void Configure(EntityTypeBuilder<VendaEntity> builder)
        {
            builder.ToTable("Venda");
            builder.HasKey("Id");
            builder.Property(V => V.ValorTotal).HasColumnType("DECIMAL(10,2)");
            builder.Property(V => V.CriadoEm).HasColumnType("DATETIME()").HasDefaultValueSql("GETDATE()");

            builder.HasMany(V => V.ItensVenda)
            .WithOne(I => I.Venda)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Cascade);

            // builder.HasOne(V => V.Usuario)
            // .WithMany(U => U.Venda)
            // .IsRequired(true);
        }
    }
}