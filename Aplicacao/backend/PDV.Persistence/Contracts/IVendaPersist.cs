using PDV.Domain.Entities;

namespace PDV.Persistence.Contracts
{
    public interface IVendaPersist : IGeralPersist
    {
        public Task<VendaEntity[]> GetAllVendasAsync();
        public Task<VendaEntity[]> GetVendasByIDAsync(int ID, bool includeItensVenda = false);
    }
}