using Microsoft.AspNetCore.Identity;

namespace PDV.Domain.Identity
{
    public class Role : IdentityRole<int>
    {
        public IEnumerable<UserRole> UserRoles { get; set; } = new List<UserRole>();    
    }
}