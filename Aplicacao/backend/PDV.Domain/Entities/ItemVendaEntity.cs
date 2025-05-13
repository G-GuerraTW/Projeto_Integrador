using PDV.Domain.Identity;

namespace PDV.Domain.Entities
{
    public class ItemVendaEntity
    {
        public int Id { get; set; }
        public int Quantidade { get; set; }
        public double PrecoUnitario { get; set; }
        public int VendaId { get; set; }
        public VendaEntity Venda { get; set; }
        public int ProdutoId { get; set; }
        public ProdutoEntity Produto { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}