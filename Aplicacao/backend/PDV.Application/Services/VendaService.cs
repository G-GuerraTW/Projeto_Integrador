using AutoMapper;
using PDV.Application.Contracts;
using PDV.Application.DTOs;
using PDV.Domain.Entities;
using PDV.Persistence.Contracts;
using PDV.Persistence.Repositories;
using System.Xml.Linq;

namespace PDV.Application.Services
{
    public class VendaService : IVendaService
    {
        private readonly IVendaPersist _vendaPersist;
        private readonly IMapper _mapper;

        public VendaService(
            IVendaPersist vendaPersist,
            IMapper mapper)
        {
            _mapper = mapper;
            _vendaPersist = vendaPersist;
        }
        public async Task<VendaDTO> AddVenda(VendaEntity model)
        {
            try
            {
                if (model == null) throw new Exception("Objeto Nulo ou InvÃ¡lido");
                _vendaPersist.Add(model);

                if (await _vendaPersist.SaveChangesAsync())
                {
                    var entity = await _vendaPersist.GetVendasByIDAsync(model.Id);
                    return _mapper.Map<VendaDTO>(entity);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao persistir o cadastro de venda no banco: {ex.Message}");
            }
        }

        public async Task<VendaDTO> UpdateEvento(int vendaId, VendaEntity model)
        {
            try
            {
                if (model == null)
                    throw new Exception("Objeto Nulo ou Inválido");

                var modelUpdate = await _vendaPersist.GetVendasByIDAsync(vendaId) ??
                                  throw new Exception($"NÃo foi possÃ­vel encontrar um produto de Id: {vendaId}");

                var venda = modelUpdate.FirstOrDefault();
                _mapper.Map(model, venda);
                _vendaPersist.Update(venda!);

                if (await _vendaPersist.SaveChangesAsync())
                    return _mapper.Map<VendaDTO>(modelUpdate);

                return _mapper.Map<VendaDTO>(modelUpdate);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao atualizar o produto: {ex.Message}");
            }
        }

        public async void DeleteEvento(int vendaID)
        {
            try
            {
                _vendaPersist.Delete(vendaID);

                await _vendaPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao remover a venda: {ex.Message}");
            }
        }

        public async Task<VendaDTO[]> GetAllVendaAsync()
        {
            try
            {
                var produtos = await _vendaPersist.GetAllVendasAsync();

                return _mapper.Map<VendaDTO[]>(produtos);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao buscar as vendas: {ex.Message}");
            }
        }
    }
}
