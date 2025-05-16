using PDV.Domain.Enum;

namespace PDV.Application.DTOs
{
    public class ProdutoDTO
    {
        public int Id { get; set; }        
        public string? Nome { get; set; }
        public Categoria Categoria { get; set; }
        public int? Tamanho { get; set; }
        public string? Cor { get; set; }
        public int Quantidade { get; set; }
        public double? PrecoCusto { get; set; }
        public double? PrecoVenda { get; set; }
        public DateTime? CriadoEm { get; set; } = DateTime.Now;
        public int userID { get; set; }

    }
}