using Microsoft.AspNetCore.Mvc;
using PDV.Application.Contracts;
using PDV.Application.DTOs;
using PDV.Domain.Entities;

namespace PDV.API.controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private readonly IProdutoService _produtoService;
        public ProdutoController(IProdutoService _produtoService)
        {
            this._produtoService = _produtoService;
        }

        [HttpPost]
        public async Task<IActionResult> AddProduto(ProdutoEntity model) 
        {
            try
            {
                if(model == null) return BadRequest("Erro ao tentar Adicionar novo Produto");
                var produto = await _produtoService.AddProduto(model);
                if(produto != null) return Ok(produto);
                return BadRequest("Erro ao persistir cadastro do produto ao banco.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar eventos, Erro: {ex.Message}"
                );
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduto(int id, ProdutoDTO model) 
        {
            var produto = await _produtoService.UpdateProduto(id, model);
            if(produto == null) return BadRequest("Erro ao tentar adicionar Produto");
            return Ok(produto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduto(int id) 
        {
            try
            {
                if( id < 0) return BadRequest("Erro ao tentar deletar Produto");
                var resultado = await _produtoService.DeleteProduto(id);

                if(resultado) return Ok("Produto deletado");
                return BadRequest("Produto não deletado");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar produto. Erro: {ex.Message}"
                );
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetProdutos() 
        {
            try
            {
                var produtos = await _produtoService.GetAllProdutoAsync();
                if (produtos == null) return NoContent();
                return Ok(produtos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Produtos Erro: {ex.Message}");
            }
        }

        [HttpGet("nome/{nomeProduto}")]
        public async Task<IActionResult> GetProdutosByName(string nomeProduto)
        {
            try
            {
                var produtos = await _produtoService.GetAllProdutByNameAsync(nomeProduto);
                if(produtos == null) return NoContent();
                return Ok(produtos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Produtos. Erro: {ex.Message}");
            }
        }

        [HttpGet("categoria/{Categoria}")]
        public async Task<IActionResult> GetProdutosByCategoria(string Categoria) 
        {
            try
            {
                var produtos = await _produtoService.GetAllProdutoByCategoriaAsync(Categoria);
                if(produtos == null) return NoContent();
                return Ok(produtos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Produtos por categoria. Erro: {ex.Message}"
                );
            }
        }
    }
}