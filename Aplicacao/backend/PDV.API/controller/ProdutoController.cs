using Microsoft.AspNetCore.Mvc;
using PDV.Application.Contracts;
using PDV.Application.DTOs;

namespace PDV.API.Controller
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
        public async Task<ActionResult<ProdutoDTO>> AddProduto(ProdutoDTO model)
        {
            try
            {
                if (model == null)
                    return BadRequest("Erro ao tentar Adicionar novo Produto");

                var produto = await _produtoService.AddProduto(model);
                if (produto == null)
                    return BadRequest("Erro ao persistir cadastro do produto ao banco.");

                return Ok(produto);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar eventos, Erro: {ex.Message}"
                );
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProdutoDTO>> UpdateProduto(int id, ProdutoDTO model)
        {
            try
            {
                var produto = await _produtoService.UpdateProduto(id, model);
                if (produto == null)
                    return BadRequest("Erro ao tentar atualizar o Produto");

                return Ok(produto);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar o produto. Erro: {ex.Message}"
                );
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduto(int id)
        {
            try
            {
                if (id == null || id < 0)
                    return BadRequest("Erro ao tentar deletar Produto");

                var resultado = await _produtoService.DeleteProduto(id);

                if (resultado) return Ok("Produto deletado");

                return BadRequest("Produto não deletado");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar o produto. Erro: {ex.Message}"
                );
            }
        }

        [HttpGet]
        public async Task<ActionResult<ProdutoDTO[]>> GetProdutos()
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

        [HttpGet("{id}")]
        public async Task<ActionResult<ProdutoDTO>> GetProdutoById(int id)
        {
            try
            {
                var produtos = await _produtoService.GetProdutoByIDAsync(id);
                if (produtos == null) return NoContent();
                return Ok(produtos);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Produtos por categoria. Erro: {ex.Message}"
                );
            }
        }

        [HttpGet("nome/{nomeProduto}")]
        public async Task<ActionResult<ProdutoDTO[]>> GetProdutosByName(string nomeProduto)
        {
            try
            {
                var produtos = await _produtoService.GetAllProdutByNameAsync(nomeProduto);
                if (produtos == null)
                    return NoContent();

                return Ok(produtos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Produtos. Erro: {ex.Message}");
            }
        }

        [HttpGet("categoria/{categoria}")]
        public async Task<ActionResult<ProdutoDTO[]>> GetProdutosByCategoria(string categoria)
        {
            try
            {
                var produtos = await _produtoService.GetAllProdutoByCategoriaAsync(categoria);
                if (produtos == null) return NoContent();
                return Ok(produtos);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Produtos por categoria. Erro: {ex.Message}"
                );
            }
        }
    }
}