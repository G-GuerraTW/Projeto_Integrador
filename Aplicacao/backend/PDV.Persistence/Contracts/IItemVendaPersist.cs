using PDV.Domain.Entities;

namespace PDV.Persistence.Contracts
{
    public interface IItemVendaPersist : IGeralPersist
    {
        public Task<ItemVendaEntity[]> GetAllItensVendaAsync(string vendaId);
        public Task<ItemVendaEntity?> GetItensVendaByIDAsync(int id);
    }
}
