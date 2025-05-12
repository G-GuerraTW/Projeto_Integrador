namespace PDV.Application.DTOs
{
    public class VendaDTO
    {
        public int Id { get; set; }
        public DateTime Data { get; set; }
        public decimal Total { get; set; }
        public decimal ValorPago { get; set; }
        public decimal Troco { get; set; }
        public int UsuarioId { get; set; }
        public string FormaPagamento { get; set; } = string.Empty;
        public IEnumerable<ItemVendaDTO> ItensVenda { get; set; } = new List<ItemVendaDTO>();
    }
}