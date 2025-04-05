using Microsoft.EntityFrameworkCore;
using PDV.Domain.Entities;
using PDV.Persistence.Context;
using PDV.Persistence.Contracts;

namespace PDV.Persistence.Repositories
{
    public class ProdutoPersist : IProdutoPersist
    {
        private readonly PDVContext contexto;
        public ProdutoPersist(PDVContext contexto)
        {
            this.contexto = contexto;
        }

        public async Task<Produto[]> GetAllProdutoAsync()
        {
            IQueryable<Produto> query = contexto.Produtos.AsNoTracking();

            return await query.ToArrayAsync();
        }

        public async Task<Produto[]> GetAllProdutByNameAsync(string Name)
        {
            IQueryable<Produto> query = contexto.Produtos.AsNoTracking();

            query = query.Where(P => P.Nome == Name);

            return await query.ToArrayAsync();
        }

        public async Task<Produto[]> GetAllProdutoByCategoriaAsync(string Categoria)
        {
            IQueryable<Produto> query = contexto.Produtos.AsNoTracking();

            query = query.Where(P => P.Categoria == Categoria);

            return await query.ToArrayAsync();
        }

        public async Task<Produto> GetProdutoByIDAsync(int ID)
        {
            IQueryable<Produto> query = contexto.Produtos.AsNoTracking();

            query = query.Where(P => P.Id == ID);

            return await query.FirstOrDefaultAsync();
        }
    }
}