
namespace PDV.Application.DTOs
{
    public class UserDTO
    {
        public string nome { get; set; }
        public string Email { get; set; }
        public string? UserName { get; set; }
        public string Password { get; set; }
        public string? Perfil { get; set; }

        public void SincronizaUsernameComEmail()
        {
            UserName = Email;
        }
    }
}