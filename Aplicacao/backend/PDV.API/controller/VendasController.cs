using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PDV.Application.Contracts;
using PDV.Application.DTOs;

namespace PDV.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendasController : ControllerBase
    {
        private readonly IVendaService _service;

        public VendasController(IVendaService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<VendaDTO>> AddVendas(VendaDTO venddaDto)
        {
            try
            {
                if (venddaDto == null)
                    return BadRequest("Erro ao criar uma venda");

                var venda = await _service.AddVenda(venddaDto);
                if (venda == null)
                    return BadRequest("Erro ao persistir uma venda.");

                return Ok(venda);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar eventos, Erro: {ex.Message}"
                );
            }
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<VendaDTO[]>> GetVendas()
        {
            var result = await _service.GetAllVendaAsync();
            if (result is null)
                return NoContent();

            return Ok(result);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<VendaDTO>> UpdateVendas(int id, VendaDTO vendaDto)
        {
            try
            {
                var result = await _service.UpdateVenda(id, vendaDto);

                if (result is null)
                    return BadRequest("Erro ao tentar atualizar a venda");

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar a venda. Erro: {ex.Message}"
                );
            }
        }

        [Authorize]    
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVenda(int id)
        {
            try
            {
                if (await _service.DeleteVenda(id))
                    return Ok("Venda deletada");

                return BadRequest("Venda não deletada");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar a venda. Erro: {ex.Message}"
                );
            }
        }
<<<<<<< HEAD

        [Authorize]
        [HttpGet("{UserName}")]
        public async Task<ActionResult<VendaDTO[]>> GetVendasByUserName(string userName)
        {
            var result = await _service.GetVendasByUserName(userName);
            if (result is null)
                return NoContent();

            return Ok(result);
        }
        
=======
>>>>>>> 4ed2af4e31243ebdcbac8ceb57f90e0a1e0eaa39
    }
}
