using Microsoft.AspNetCore.Identity;
using PDV.Domain.Enum;

namespace PDV.Domain.Identity
{
    public class User : IdentityUser<int> //INT siguinifica que a key vai ser INT e não GUIDE
    {
        public string NomeCompleto { get; set; }
        public Funcao Funcao { get; set; } = Funcao.Usuario;
        public IEnumerable<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}