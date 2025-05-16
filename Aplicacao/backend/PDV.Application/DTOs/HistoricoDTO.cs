namespace PDV.Application.DTOs
{
    public class HistoricoDTO
    {
        public int VendasHoje { get; set; }
        public double ValorTotalVendas { get; set; }
        public int ProdutosCadastrados { get; set; }
        public int ProdutosEmEstoque { get; set; }
        public int ProdutosSemEstoque { get; set; }
        public FormaPagamento VendasPorFormaPagamento { get; set; }
        public CategoriasDTO VendasPorCategoria { get; set; }

    }
}
