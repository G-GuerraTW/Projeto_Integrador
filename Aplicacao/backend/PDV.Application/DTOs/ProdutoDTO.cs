namespace PDV.Application.DTOs
{
    public class ProdutoDTO
    {
        public int Id { get; set; }        
        public string Nome { get; set; }
        public string Categoria { get; set; }
        public int Tamanho { get; set; }
        public string Cor { get; set; }
        public int Quantidade { get; set; }
        public decimal PrecoCusto { get; set; }
        public decimal PrecoVenda { get; set; }
        public DateTime CriadoEm { get; set; }

        public IEnumerable<ProdutoDTO> ItensVenda { get; set; } = new List<ProdutoDTO>();

    }
}