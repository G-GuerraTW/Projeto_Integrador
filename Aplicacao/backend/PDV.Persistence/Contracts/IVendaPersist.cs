using PDV.Domain.Entities;

namespace PDV.Persistence.Contracts
{
    public interface IVendaPersist : IGeralPersist
    {
        public Task<VendaEntity[]> GetAllVendasAsync(DateTime? data);
        public Task<VendaEntity[]> GetVendasByIDAsync(int ID, bool includeItensVenda = false);
        public Task<VendaEntity[]> GetVendasByUserName(string userName);
    }
}