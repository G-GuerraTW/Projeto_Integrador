namespace PDV.Application.DTOs
{
    public class VendaDTO
    {
        public int Id { get; set; }
        public int usuario_Id { get; set; }
        public decimal valorTotal { get; set; }
        public DateTime CriadoEm { get; set; }
        public IEnumerable<ItemVendaDTO> itensVenda{ get; set; } = new List<ItemVendaDTO>();
    }
}