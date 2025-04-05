namespace PDV.Application.DTOs
{
    public class ItensVendaDTO
    {
        public int Id { get; set; }
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }
        public decimal PrecoUnitario { get; set; }
        public decimal SubTotal { get; set; }
        public IEnumerable<ProdutoDTO> Produtos { get; set; } = new List<ProdutoDTO>();
    }
}