using PDV.Application.DTOs;

namespace PDV.Application.Contracts
{
    public interface IVendaService 
    {
        public Task<VendaDTO> AddVenda(VendaDTO model);
        public Task<VendaDTO> UpdateVenda(int vendaId, VendaDTO model);
        public Task<bool> DeleteVenda(int vendaID);
        public Task<VendaDTO[]> GetAllVendaAsync();
        public Task<VendaDTO[]> GetVendasByUserName(string userName);
    }
}
