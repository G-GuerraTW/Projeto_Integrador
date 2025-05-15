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

        public async Task<VendaEntity[]> GetAllVendasAsync(DateTime? data)
        {
            IQueryable<VendaEntity> query = context.Vendas.AsNoTracking();
           
            var queryable = data.HasValue ? query.Where(x => x.CriadoEm == data).Include(V => V.ItensVenda).ThenInclude(IV => IV.Produto) : query;

            return await queryable.ToArrayAsync();
        }

        public async Task<VendaEntity> GetVendasByIDAsync(int ID, bool includeItensVenda = false)
        {
            IQueryable<VendaEntity> query = context.Vendas.AsNoTracking();

            query = query.Where(V => V.Id == ID).Include(V => V.ItensVenda).ThenInclude(IV => IV.Produto);

            if (includeItensVenda) query = query.Include(V => V.ItensVenda);

            return await query.FirstOrDefaultAsync();
        }


        public async Task<VendaEntity[]> GetVendasByUserIDAsync(int userID)
        {
            IQueryable<VendaEntity> query = context.Vendas.Where(V => V.UserId == userID).AsNoTracking().Include(V => V.ItensVenda).ThenInclude(IV => IV.Produto);

            return await query.ToArrayAsync();
        }
    }
}