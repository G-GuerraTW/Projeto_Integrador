using PDV.Domain.Identity;

namespace PDV.Domain.Entities
{
    public class VendaEntity
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public decimal ValorTotal { get; set; }
        public DateTime CriadoEm { get; set; }
        // public Usuario Usuario { get; set; }
        public IEnumerable<ItemVendaEntity> ItensVenda { get; set; } = new List<ItemVendaEntity>();

        public int UserId { get; set; }
        public User User { get; set; }
    }
}