using AutoMapper;
using PDV.Application.Contracts;
using PDV.Application.DTOs;
using PDV.Persistence.Contracts;
using PDV.Persistence.Repositories;

namespace PDV.Application.Services
{
    public class HistoricoService : IHistoricoService
    {
        private readonly IMapper _mapper;
        private readonly IVendaPersist _vendaPersist;
        private readonly IProdutoPersist _produtoPersist;
        private readonly IItemVendaPersist _itemVendaPersist;

        public HistoricoService(
            IMapper mapper,
            IVendaPersist vendaPersist,
            IProdutoPersist produtoPersist,
            IItemVendaPersist itemVendaPersist)
        {
            _itemVendaPersist = itemVendaPersist;
            _produtoPersist = produtoPersist;
            _vendaPersist = vendaPersist;
            _mapper = mapper;
        }

        public async Task<HistoricoDTO> GetHistoricoAsync()
        {
            var result = new HistoricoDTO();
            FormaPagamento formaPagamento = new();
            CategoriasDTO categorias = new();
            int totalProdutos = 0;
            var vendasHoje = (await _vendaPersist.GetAllVendasAsync(null)).Select(x => x.CriadoEm.Day == DateTime.Now.Day);
            var vendasGeral = await _vendaPersist.GetAllVendasAsync(null);

            foreach (var venda in vendasGeral)
            {
                switch (venda.FormaPagamento)
                {
                    case "Dinheiro": formaPagamento.Dinheiro++; break;
                    case "Pix": formaPagamento.Pix++; break;
                    case "Cartão": formaPagamento.Cartão++; break;
                }
            }

            int produtosVendidos = 0;

            foreach (var venda in vendasGeral)
            {
                int somaItemPorVenda = 0;
                var itemVenda = await _itemVendaPersist.GetAllItensVendaAsync(venda.Id);
                foreach (var item in itemVenda)
                {
                    somaItemPorVenda += item.Quantidade;

                    var produto = await _produtoPersist.GetProdutoByIDAsync(item.ProdutoId);
                    switch (produto!.Categoria)
                    {
                        case "Acessórios": categorias.Acessorios++; break;
                        case "Calçados": categorias.Calcados++; break;
                        case "Roupas": categorias.Roupas++; break;
                    }
                }
                produtosVendidos += somaItemPorVenda;
            }

            var produtos = await _produtoPersist.GetAllProdutoAsync();
            foreach (var prod in produtos)
                totalProdutos += prod.Quantidade;

            result.VendasHoje = vendasHoje.Count();
            result.ValorTotalVendas = vendasGeral.Select(x => x.Total).Sum();
            result.VendasPorFormaPagamento = formaPagamento;
            result.VendasPorCategoria = categorias;
            result.ProdutosCadastrados = totalProdutos;
            result.ProdutosSemEstoque = produtosVendidos;
            result.ProdutosEmEstoque = totalProdutos - produtosVendidos;

            return result;
        }
    }
}
