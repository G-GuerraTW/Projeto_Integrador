using PDV.Domain.Entities;

namespace PDV.Persistence.Contracts
{
    public interface IProdutoPersist
    {
        public Task<Produto[]> GetAllProdutoAsync();
        public Task<Produto[]> GetAllProdutByNameAsync(string Name);
        public Task<Produto[]> GetAllProdutoByCategoriaAsync(string Categoria);
        public Task<Produto> GetProdutoByIDAsync(int ID);


    }
}