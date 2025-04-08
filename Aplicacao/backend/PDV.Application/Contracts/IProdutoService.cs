using PDV.Application.DTOs;

namespace PDV.Application.Contracts
{
    public interface IProdutoService
    {
        public Task<ProdutoDTO> AddProduto(ProdutoDTO model);
        public Task<ProdutoDTO> UpdateProduto(int produtoId, ProdutoDTO model);
        public Task<bool> DeleteProduto(int produtoID);
        public Task<ProdutoDTO[]> GetAllProdutoAsync();
        public Task<ProdutoDTO[]> GetAllProdutByNameAsync(string name);
        public Task<ProdutoDTO[]> GetAllProdutoByCategoriaAsync(string categoria); 
        public Task<ProdutoDTO> GetProdutoByIDAsync(int ID);
    }
}