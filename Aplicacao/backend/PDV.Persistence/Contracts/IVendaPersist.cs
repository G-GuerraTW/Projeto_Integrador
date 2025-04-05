using PDV.Domain.Entities;

namespace PDV.Persistence.Contracts
{
    public interface IVendaPersist
    {
        public Task<Venda[]> GetAllVendasAsync();
        public Task<Venda[]> GetVendasByIDAsync(int ID, bool includeItensVenda = false);
    }
}