using PDV.Application.DTOs;

namespace PDV.Application.Contracts
{
    public interface IItemVendaService
    {
        public Task<ItemVendaDTO> UpdateItemVenda(int idItemVenda, ItemVendaDTO model);
        public Task<bool> DeleteItemVenda(int idItemVenda);
        public Task<ItemVendaDTO[]> GetAllItemVendaAsync(int vendaId);
        public Task<ItemVendaDTO> GetItemVendaByIdAsync(int idItemVenda);
        public decimal CalcularPreco(int quantidade, decimal preco);
    }
}
