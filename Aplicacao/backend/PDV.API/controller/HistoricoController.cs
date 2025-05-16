using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PDV.Application.Contracts;
using PDV.Application.DTOs;
using PDV.Application.Services;

namespace PDV.API.Controller
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class HistoricoController : ControllerBase
    {
        private readonly IHistoricoService _historicoService;

        public HistoricoController(IHistoricoService historicoService)
        {
            _historicoService = historicoService;
        }

        [HttpGet]
        public async Task<ActionResult<HistoricoDTO>> GetAsync()
        {
            return await _historicoService.GetHistoricoAsync();
        }

    }
}
