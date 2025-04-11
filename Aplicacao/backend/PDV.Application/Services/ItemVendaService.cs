using AutoMapper;
using PDV.Application.Contracts;
using PDV.Application.DTOs;
using PDV.Domain.Entities;
using PDV.Persistence.Contracts;
using PDV.Persistence.Repositories;

namespace PDV.Application.Services
{
    public class ItemVendaService : IItemVendaService
    {
        private readonly IVendaPersist _vendaPersist;
        private readonly IMapper _mapper;
        private readonly IItemVendaPersist _itemVendaPersist;
        private readonly IProdutoPersist _produtoPersist;

        public ItemVendaService(
            IMapper mapper,
            IItemVendaPersist itemVendaPersist,
            IVendaPersist vendaPersist,
            IProdutoPersist produtoPersist)
        {
            _produtoPersist = produtoPersist;
            _mapper = mapper;
            _vendaPersist = vendaPersist;
            _itemVendaPersist = itemVendaPersist;
        }

        public async Task<ItemVendaDTO> AddItemVenda(ItemVendaDTO model)
        {
            try
            {
                if (model is null)
                    throw new Exception("Objeto Nulo ou Inválido");

                var venda = await _vendaPersist.GetVendasByIDAsync(model.VendaId);
                if (venda.Length == 0)
                    throw new Exception("Não foi possível encontrar a venda");

                var produto = await _produtoPersist.GetProdutoByIDAsync(model.ProdutoId); 
                if(produto is null)
                    throw new Exception($"Não foi possível encontrar o produto de ID: {model.ProdutoId}");

                var entity = _mapper.Map<ItemVendaEntity>(model);

                entity.Subtotal = CalcularPreco(model.Quantidade, model.PrecoUnitario);
            
                _itemVendaPersist.Add(entity);
                if (await _vendaPersist.SaveChangesAsync())
                    return model;

                return model;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao inserir intens da venda: {ex.Message}");
            }
        }

        public decimal CalcularPreco(int quantidade, decimal preco) => quantidade * preco;

        public async Task<ItemVendaDTO> UpdateItemVenda(int produtoId, ItemVendaDTO model)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteItemVenda(int produtoId)
        {
            throw new NotImplementedException();
        }

        public async Task<ItemVendaDTO[]> GetAllItemVendaAsync(string vendaId)
        {
            throw new NotImplementedException();
        }

        public async Task<ItemVendaDTO> GetItemVendaByIDAsync(int ID)
        {
            throw new NotImplementedException();
        }

    }
}
