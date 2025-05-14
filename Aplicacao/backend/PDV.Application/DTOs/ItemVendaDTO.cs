namespace PDV.Application.DTOs
{
    public class ItemVendaDTO
    {
        public int Quantidade { get; set; }
        public double SubTotal { get; set; }
        public int? VendaId { get; set; }
        public VendaDTO? Venda { get; set; }
        public int ProdutoId { get; set; }
        public IEnumerable<ProdutoDTO> ProdutoDTOs { get; set; } = new List<ProdutoDTO>();
    }
}