using AutoMapper;
using PDV.Application.Contracts;
using PDV.Application.DTOs;
using PDV.Domain.Entities;
using PDV.Persistence.Contracts;

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
        public decimal CalcularPreco(int quantidade, decimal preco) => quantidade * preco;

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
                if (produto is null)
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
                throw new Exception($"Erro ao inserir itens da venda: {ex.Message}");
            }
        }

        public async Task<ItemVendaDTO> GetItemVendaByIdAsync(int idItemVenda)
        {
            try
            {
                if (idItemVenda == 0)
                    throw new Exception("Codigo inválido");

                var itemVenda = await _itemVendaPersist.GetItemVendaByIDAsync(idItemVenda) ??
                                throw new Exception("Não foi possivel encontrar os itens da venda");

                return _mapper.Map<ItemVendaDTO>(itemVenda);
            }
            catch (Exception e)
            {
                throw new Exception($"Erro ao buscar o item pelo Id: {e.Message}");

            }
        }

        public async Task<ItemVendaDTO> UpdateItemVenda(int idItemVenda, ItemVendaDTO model)
        {
            try
            {
                var venda = await _vendaPersist.GetVendasByIDAsync(model.VendaId);
                if (venda.Length == 0)
                    throw new Exception("Não foi possível encontrar a venda");

                var produto = await _produtoPersist.GetProdutoByIDAsync(model.ProdutoId);
                if (produto is null)
                    throw new Exception($"Não foi possível encontrar o produto de ID: {model.ProdutoId}");

                var itemVenda = await _itemVendaPersist.GetItemVendaByIDAsync(idItemVenda) ??
                                throw new Exception("Não foi possivel encontrar os itens da venda");

                _mapper.Map(itemVenda, model);

                _itemVendaPersist.Update(itemVenda);

                if (await _vendaPersist.SaveChangesAsync())
                    return model;

                return model;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao atualizar itens da venda: {ex.Message}");
            }
        }

        public async Task<bool> DeleteItemVenda(int idItemVenda)
        {
            try
            {
                if (idItemVenda == 0)
                    throw new Exception("Codigo inválido");

                var itemVenda = await _itemVendaPersist.GetItemVendaByIDAsync(idItemVenda) ??
                                throw new Exception("Não foi possivel encontrar os itens da venda");

                _itemVendaPersist.Delete(itemVenda);

                return await _vendaPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao deletar um item");
            }
        }

        public async Task<ItemVendaDTO[]> GetAllItemVendaAsync(int vendaId)
        {
            try
            {
                if (vendaId == 0)
                    throw new Exception("Codigo da venda inválido");

                var venda = await _vendaPersist.GetVendasByIDAsync(vendaId);
                if (venda.Length <= 0)
                    throw new Exception($"Não foi possivel encontrar a venda de Id: {vendaId}");

                var entities = await _itemVendaPersist.GetAllItensVendaAsync(vendaId);

                return _mapper.Map<ItemVendaDTO[]>(entities);
            }
            catch (Exception e)
            {
                throw new Exception("Erro ao buscar todos os itens de uma venda.");
            }
        }
    }
}
