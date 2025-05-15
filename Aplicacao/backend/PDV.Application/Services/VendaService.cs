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
        private readonly IUserPersist userPersist;

        public VendaService(
            IVendaPersist vendaPersist,
            IUserPersist userPersist,
            IMapper mapper)
        {
            this.userPersist = userPersist;
            _mapper = mapper;
            _vendaPersist = vendaPersist;
        }
        public async Task<VendaDTO> AddVenda(VendaDTO model)
        {
            try
            {
                if (model is null) throw new Exception("Objeto Nulo ou Inválido");

                var vendaEntity = _mapper.Map<VendaEntity>(model);
                _vendaPersist.Add(vendaEntity);

                if (await _vendaPersist.SaveChangesAsync())
                {
                    return _mapper.Map<VendaDTO>(vendaEntity);
                }
                    
                return null;
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
                if (model == null) throw new Exception("Objeto Nulo ou Inválido");
            
                var venda = await _vendaPersist.GetVendasByIDAsync(vendaId) ??
                            throw new Exception($"Não foi possível encontrar a venda de Id: {vendaId}");

                var vendaAlterada = _mapper.Map<VendaEntity>(model);

                _vendaPersist.Update(venda);

                if (await _vendaPersist.SaveChangesAsync())
                {
                    return _mapper.Map<VendaDTO>(venda);
                }

                return _mapper.Map<VendaDTO>(venda);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao atualizar a venda: {ex.Message}");
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

                foreach (var venda in vendasdto)
                {
                    if (venda.ItensVenda != null)
                    {
                        foreach (var item in venda.ItensVenda)
                        {
                            item.SubTotal = item.Produto?.PrecoVenda.GetValueOrDefault() * item.Quantidade ?? 0;
                        }
                    }
                }

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
                var user = await userPersist.GetUserByUsernameAsync(userName);
                var vendas = await _vendaPersist.GetVendasByUserIDAsync(user.Id);
                var vendasDto = _mapper.Map<VendaDTO[]>(vendas);
        
                foreach (var venda in vendasDto)
                {
                    if (venda.ItensVenda != null)
                    {
                        foreach (var item in venda.ItensVenda)
                        {
                            item.SubTotal = item.Produto?.PrecoVenda.GetValueOrDefault() * item.Quantidade ?? 0;
                        }
                    }
                }
        
                return vendasDto;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao buscar as vendas do usuario: {ex.Message}");
            }
        }

    }
}
