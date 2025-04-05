using PDV.Domain.Entities;
using PDV.Persistence.Context;
using PDV.Persistence.Contracts;
using Microsoft.EntityFrameworkCore;

namespace PDV.Persistence.Repositories
{
    public class VendaPersist : IVendaPersist
    {
        private readonly PDVContext context;
        public VendaPersist(PDVContext context)
        {
            this.context = context;
        }

        public async Task<Venda[]> GetAllVendasAsync()
        {
            IQueryable<Venda> query = context.Vendas.AsNoTracking();

            return await query.ToArrayAsync();
        }

        public async Task<Venda[]> GetVendasByIDAsync(int ID, bool includeItensVenda = false)
        {
            IQueryable<Venda> query = context.Vendas.AsNoTracking();

            query = query.Where(V => V.Id == ID);

            if(includeItensVenda) query = query.Include(V => V.ItensVenda);

            return await query.ToArrayAsync();
        }
    }
}