using PDV.Domain.Identity;

namespace PDV.Domain.Entities
{
    public class ProdutoEntity
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Categoria { get; set; } = string.Empty;
        public string Tamanho { get; set; } = string.Empty;
        public string Cor { get; set; } = string.Empty;
        public int Quantidade { get; set; }
        public double PrecoCusto { get; set; }
        public double PrecoVenda { get; set; }
        public DateTime CriadoEm { get; set; }

        public IEnumerable<ItemVendaEntity> ItensVenda { get; set; } = new List<ItemVendaEntity>();

        public int UserId { get; set; }
        public User User { get; set; }
    }
}