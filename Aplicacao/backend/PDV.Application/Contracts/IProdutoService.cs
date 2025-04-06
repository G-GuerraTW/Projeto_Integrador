using System.Diagnostics.Tracing;
using PDV.Application.DTOs;
using PDV.Domain.Entities;

namespace PDV.Application.Contracts
{
    public interface IProdutoService
    {
        public Task<ProdutoDTO> AddProduto(ProdutoEntity model);
        public Task<ProdutoDTO> UpdateEvento(int produtoId, ProdutoEntity model);
        public void DeleteEvento(int produtoID);
        public Task<ProdutoDTO[]> GetAllProdutoAsync();
        public Task<ProdutoDTO[]> GetAllProdutByNameAsync(string name);
        public Task<ProdutoDTO[]> GetAllProdutoByCategoriaAsync(string categoria);        
    }
}