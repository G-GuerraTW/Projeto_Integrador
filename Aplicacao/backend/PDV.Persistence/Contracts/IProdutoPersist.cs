using PDV.Domain.Entities;

namespace PDV.Persistence.Contracts
{
    public interface IProdutoPersist : IGeralPersist
    {
        public Task<ProdutoEntity[]> GetAllProdutoAsync();
        public Task<ProdutoEntity[]> GetAllProdutByNameAsync(string Name);
        public Task<ProdutoEntity[]> GetAllProdutoByCategoriaAsync(string Categoria);
        public Task<ProdutoEntity> GetProdutoByIDAsync(int ID);

    }
}