using AutoMapper;
using PDV.Application.Contracts;
using PDV.Application.DTOs;
using PDV.Domain.Entities;
using PDV.Persistence.Contracts;
using PDV.Persistence.Repositories;

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
        public async Task<VendaDTO> AddVenda(VendaDTO model)
        {
            try
            {
                if (model is null)
                    throw new Exception("Objeto Nulo ou Inválido");

                var vendaEntity = _mapper.Map<VendaEntity>(model);
                _vendaPersist.Add(vendaEntity);

                if (await _vendaPersist.SaveChangesAsync())
                    return model;

                return model;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao persistir o cadastro de venda no banco: {ex.Message}");
            }
        }

        public async Task<VendaDTO> UpdateVenda(int vendaId, VendaDTO model)
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

        public async Task<bool> DeleteVenda(int vendaID)
        {
            try
            {
                var verificaVenda = await _vendaPersist.GetVendasByIDAsync(vendaID);

                if (verificaVenda != null) throw new Exception("ID De venda não existe para exclusão");
                _vendaPersist.Delete(verificaVenda);

                return await _vendaPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao remover a venda: {ex.Message}");
            }
        }

        public async Task<VendaDTO[]> GetAllVendaAsync(DateTime? data)
        {
            try
            {
                var vendas = await _vendaPersist.GetAllVendasAsync(data);
                var vendasdto = _mapper.Map<VendaDTO[]>(vendas);

                // foreach (var dto in vendasdto)
                // {
                //     foreach (var item in dto.ItensVenda)
                //         item.SubTotal = item.Quantidade * item.Quantidade;
                // }

                return vendasdto;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao buscar as vendas: {ex.Message}");
            }
        }

        public async Task<VendaDTO[]> GetVendasByUserName(string userName)
        {
            try
            {
                var vendas = await _vendaPersist.GetVendasByUserName(userName);

                return _mapper.Map<VendaDTO[]>(vendas);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao buscar as vendas do usuario: {ex.Message}");
            }
        }
    }
}
