using PDV.Domain.Entities;
using PDV.Persistence.Context;
using PDV.Persistence.Contracts;
using Microsoft.EntityFrameworkCore;

namespace PDV.Persistence.Repositories
{
    public class VendaPersist : GeralPersist, IVendaPersist
    {
        private readonly PDVContext context;
        public VendaPersist(PDVContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<VendaEntity[]> GetAllVendasAsync()
        {
            IQueryable<VendaEntity> query = context.Vendas.AsNoTracking();

            return await query.ToArrayAsync();
        }

        public async Task<VendaEntity[]> GetVendasByIDAsync(int ID, bool includeItensVenda = false)
        {
            IQueryable<VendaEntity> query = context.Vendas.AsNoTracking();

            query = query.Where(V => V.Id == ID);

            if(includeItensVenda) query = query.Include(V => V.ItensVenda);

            return await query.ToArrayAsync();
        }

        public async Task<VendaEntity[]> GetVendasByUserName(string userName)
        {
            IQueryable<VendaEntity> query = context.Vendas.Where(V => V.User.UserName == userName).AsNoTracking();

            return await query.ToArrayAsync();
        }
    }
}