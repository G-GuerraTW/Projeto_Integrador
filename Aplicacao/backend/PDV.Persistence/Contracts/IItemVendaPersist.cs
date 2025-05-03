using PDV.Domain.Entities;

namespace PDV.Persistence.Contracts
{
    public interface IItemVendaPersist : IGeralPersist
    {
        public Task<ItemVendaEntity[]> GetAllItensVendaAsync(int vendaId);
        public Task<ItemVendaEntity?> GetItemVendaByIDAsync(int id);
    }
}
