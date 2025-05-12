namespace PDV.Application.DTOs
{
    public class ItemVendaDTO
    {
        public int Id { get; set; }
        public int VendaId { get; set; }
        public int Quantidade { get; set; }
        public decimal PrecoUnitario { get; set; }
        public decimal SubTotal { get; set; }
        public IEnumerable<ProdutoDTO> Produtos { get; set; } = new List<ProdutoDTO>();
    }
}