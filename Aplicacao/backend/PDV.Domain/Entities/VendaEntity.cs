using PDV.Domain.Identity;

namespace PDV.Domain.Entities
{
    public class VendaEntity
    {
        public int Id { get; set; }
        public DateTime Data { get; set; }
        public double ValorTotal { get; set; }
        public string FormaPagamento { get; set; } = string.Empty;
        public DateTime CriadoEm { get; set; }
        // public Usuario Usuario { get; set; }
        public IEnumerable<ItemVendaEntity> ItensVenda { get; set; } = new List<ItemVendaEntity>();
        public int UserId { get; set; }
        public User User { get; set; }
    }
}