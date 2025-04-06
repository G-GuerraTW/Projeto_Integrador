using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PDV.Domain.Entities;

namespace PDV.Persistence.Configuration
{
    public class ProdutoConfiguration : IEntityTypeConfiguration<ProdutoEntity>
    {
        public void Configure(EntityTypeBuilder<ProdutoEntity> builder)
        {
            builder.ToTable("Produto");
            builder.HasKey("Id");
            builder.Property(P => P.Nome).HasColumnType("VARCHAR(120)");
            builder.Property(P => P.Categoria).HasColumnType("VARCHAR(80)");
            builder.Property(P => P.Tamanho).HasColumnType("INTEGER(6)");
            builder.Property(P => P.Cor).HasColumnType("INTEGER(6)");
            builder.Property(P => P.Quantidade).HasColumnType("INTEGER(6)");
            builder.Property(P => P.PrecoCusto).HasColumnType("DECIMAL(10,2)");
            builder.Property(P => P.PrecoVenda).HasColumnType("DECIMAL(10,2)");
            builder.Property(P => P.CriadoEm).HasColumnType("DATETIME()").HasDefaultValueSql("GETDATE()");

            builder.HasMany(P => P.ItensVenda)
                .WithOne(I => I.Produto)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}