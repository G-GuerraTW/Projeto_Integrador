﻿
using Microsoft.EntityFrameworkCore;
using PDV.Domain.Entities;
using PDV.Persistence.Context;
using PDV.Persistence.Contracts;

namespace PDV.Persistence.Repositories
{
    public class ItemVendaPersist(PDVContext contexto) : GeralPersist(contexto), IItemVendaPersist
    {
        public async Task<ItemVendaEntity[]> GetAllItensVendaAsync(int vendaId)
        {
            IQueryable<ItemVendaEntity> query = contexto.ItemVendas.AsNoTracking();
            query = query.Where(x => x.VendaId == vendaId);

            return await query.ToArrayAsync();
        }

        public Task<ItemVendaEntity?> GetItemVendaByIDAsync(int id)
        {
            IQueryable<ItemVendaEntity> query = contexto.ItemVendas.AsNoTracking();

            // query = query.Where(x => x.Id == id);
            return Task.FromResult(query.FirstOrDefault());
        }
    }
}
