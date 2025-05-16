
namespace PDV.Domain.Entities
{
    public class ItemVendaEntity
    {
        public int Quantidade { get; set; }
        public int VendaId { get; set; }
        public VendaEntity Venda { get; set; }
        public int ProdutoId { get; set; }
        public ProdutoEntity Produto { get; set; }
    }
}