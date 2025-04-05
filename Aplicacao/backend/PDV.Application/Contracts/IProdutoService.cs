using System.Diagnostics.Tracing;
using PDV.Application.DTOs;
using PDV.Domain.Entities;

namespace PDV.Application.Contracts
{
    public interface IProdutoService
    {
        public Task<ProdutoDTO> AddProduto(Produto model);
        public Task<ProdutoDTO> UpdateEvento(int ProdutoId, Produto model);
        public Task<ProdutoDTO> DeleteEvento(int ProdutoID);
        public Task<ProdutoDTO[]> GetAllProdutoAsync();
        public Task<ProdutoDTO[]> GetAllProdutByNameAsync(string Name);
        public Task<ProdutoDTO[]> GetAllProdutoByCategoriaAsync(string Categoria);        
    }
}