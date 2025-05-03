namespace PDV.Application.DTOs
{
    public class UserUpdateDTO
    {
        public string Id { get; set;}
        public string Titulo { get; set; }
        public string UserName { get; set; }
        public string NomeCompleto { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Funcao { get; set; }
        public string Descricao { get; set; }
        public string Password { get; set; }
        public string? Token { get; set; }
    }
}