using PDV.Application.DTOs;

namespace PDV.Application.Contracts
{
    public interface IHistoricoService
    {
        Task<HistoricoDTO> GetHistoricoAsync();
    }
}
