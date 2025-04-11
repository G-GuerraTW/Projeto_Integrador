using PDV.Application.DTOs;

namespace PDV.Application.Contracts
{
    public interface IItemVendaService
    {
        public Task<ItemVendaDTO> AddItemVenda(ItemVendaDTO model);
        public Task<ItemVendaDTO> UpdateItemVenda(int produtoId, ItemVendaDTO model);
        public Task<bool> DeleteItemVenda(int produtoId);
        public Task<ItemVendaDTO[]> GetAllItemVendaAsync(string vendaId);
        public Task<ItemVendaDTO> GetItemVendaByIDAsync(int ID);
        public decimal CalcularPreco(int quantidade, decimal preco);
    }
}
