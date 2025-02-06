namespace CadeMeuPet.Domain.Models.User
{
    public class Usuario //: IdentityUser
    {
        public string NomeCompleto { get; set; }
        public DateTime DataCadastro { get; set; } = DateTime.Now;
    }
}