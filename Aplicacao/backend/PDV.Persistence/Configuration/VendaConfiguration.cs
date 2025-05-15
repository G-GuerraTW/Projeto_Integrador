
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
            builder.HasKey(V => V.Id);
            builder.Property(V => V.Total).HasColumnType("DOUBLE");
            builder.Property(V => V.ValorPago).HasColumnType("DOUBLE");
            builder.Property(V => V.CriadoEm).HasColumnType("TEXT");
            builder.Property(V => V.FormaPagamento).HasColumnType("TEXT");
            builder.Property(V => V.Troco).HasColumnType("TEXT");

            builder.HasMany(V => V.ItensVenda)
            .WithOne(I => I.Venda)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(V => V.User)
            .WithMany()
            .HasForeignKey(V => V.UserId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}