using PDV.Application.DTOs;
using PDV.Domain.Entities;

namespace PDV.Application.Contracts
{
    public interface IVendaService 
    {
        public Task<VendaDTO> AddVenda(VendaEntity model);
        public Task<VendaDTO> UpdateEvento(int vendaId, VendaEntity model);
        public void DeleteEvento(int vendaID);
        public Task<VendaDTO[]> GetAllVendaAsync();
    }
}
