using System.Diagnostics.Tracing;
using PDV.Application.DTOs;
using PDV.Domain.Entities;

namespace PDV.Application.Contracts
{
    public interface IProdutoService
    {
        public Task<ProdutoDTO> AddProduto(ProdutoEntity model);
        public Task<ProdutoDTO> UpdateProduto(int produtoId, ProdutoDTO model);
        public Task<bool> DeleteProduto(int produtoID);
        public Task<ProdutoDTO[]> GetAllProdutoAsync();
        public Task<ProdutoDTO[]> GetAllProdutByNameAsync(string name);
        public Task<ProdutoDTO[]> GetAllProdutoByCategoriaAsync(string categoria); 
        public Task<ProdutoDTO> GetProdutoByIDAsync(int ID);
    }
}