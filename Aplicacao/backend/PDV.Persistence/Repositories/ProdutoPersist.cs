using Microsoft.EntityFrameworkCore;
using PDV.Domain.Entities;
using PDV.Persistence.Context;
using PDV.Persistence.Contracts;

namespace PDV.Persistence.Repositories
{
    public class ProdutoPersist : GeralPersist, IProdutoPersist
    {
        private readonly PDVContext contexto;
        public ProdutoPersist(PDVContext contexto) : base(contexto)
        {
            this.contexto = contexto;
        }

        public async Task<ProdutoEntity[]> GetAllProdutoAsync()
        {
            IQueryable<ProdutoEntity> query = contexto.Produtos.AsNoTracking();

            return await query.ToArrayAsync();
        }

        public async Task<ProdutoEntity[]> GetAllProdutByNameAsync(string Name)
        {
            IQueryable<ProdutoEntity> query = contexto.Produtos.AsNoTracking();

            query = query.Where(P => P.Nome == Name);

            return await query.ToArrayAsync();
        }

        public async Task<ProdutoEntity[]> GetAllProdutoByCategoriaAsync(string Categoria)
        {
            IQueryable<ProdutoEntity> query = contexto.Produtos.AsNoTracking();

            query = query.Where(P => P.Categoria == Categoria);

            return await query.ToArrayAsync();
        }

        public async Task<ProdutoEntity?> GetProdutoByIDAsync(int id)
        {
            IQueryable<ProdutoEntity> query = contexto.Produtos.AsNoTracking();

            query = query.Where(P => P.Id == id);

            return await query.FirstOrDefaultAsync();
        }
    }
}