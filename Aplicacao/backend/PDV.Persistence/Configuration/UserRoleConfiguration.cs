using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PDV.Domain.Identity;

namespace PDV.Persistence.Configuration
{
    public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
            builder.HasKey(UR => new { UR.UserId, UR.RoleId});

            builder.HasOne(UR => UR.User)
                .WithMany(U => U.UserRoles)
                .HasForeignKey(UR => UR.UserId)
                .IsRequired();

            builder.HasOne(UR => UR.Role)
                .WithMany(R => R.UserRoles)
                .HasForeignKey(UR => UR.RoleId)
                .IsRequired();
        }
    }
}