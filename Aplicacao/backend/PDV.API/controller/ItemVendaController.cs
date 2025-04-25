using Microsoft.AspNetCore.Mvc;
using PDV.Application.Contracts;
using PDV.Application.DTOs;

namespace PDV.API.Controller
{
    [Route("api/vendas")]
    [ApiController]
    public class ItemVendaController : ControllerBase
    {
        private readonly IItemVendaService _itemVendaService;

        public ItemVendaController(IItemVendaService itemVendaService)
        {
            _itemVendaService = itemVendaService;
        }

        [HttpGet("itensVenda/{idItemVenda}")]
        public async Task<ActionResult<ItemVendaDTO>> GetItemVendaByIdAsync(int idItemVenda)
        {
            try
            {
                var result = await _itemVendaService.GetItemVendaByIdAsync(idItemVenda);
                if (result == null) return NoContent();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar o item, Erro: {ex.Message}"
                );
            }
        }

        [HttpGet("{idVenda}/itensVenda")]
        public async Task<ActionResult<ItemVendaDTO[]>> GetAllItemVendaAsync(int idVenda)
        {
            try
            {
                var result = await _itemVendaService.GetAllItemVendaAsync(idVenda);
                if (result == null) return NoContent();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar buscar itens, Erro: {ex.Message}"
                );
            }
        }

        [HttpPost]
        public async Task<ActionResult<ItemVendaDTO>> PostItemVenda([FromBody] ItemVendaDTO itemVenda)
        {
            try
            {
                var result = await _itemVendaService.AddItemVenda(itemVenda);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar um item, Erro: {ex.Message}"
                );
            }
        }

        [HttpPut("itensVenda/{idItemVenda}")]
        public async Task<ActionResult<ItemVendaDTO>> PutItemVenda(int idItemVenda, [FromBody] ItemVendaDTO itemVenda)
        {
            try
            {
                var result = await _itemVendaService.UpdateItemVenda(idItemVenda, itemVenda);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar um item, Erro: {ex.Message}"
                );
            }
        }

        [HttpDelete("itensVenda/{idItemVenda}s")]
        public async Task<ActionResult<bool>> DeleteItemVenda(int idItemVenda)
        {
            try
            {
                var result = await _itemVendaService.DeleteItemVenda(idItemVenda);
                if (result)
                    return Ok("Produto deletado");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar um item, Erro: {ex.Message}"
                );
            }
        }
    }
}
