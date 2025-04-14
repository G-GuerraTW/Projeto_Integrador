using AutoMapper;
using PDV.Application.Contracts;
using PDV.Application.DTOs;
using PDV.Persistence.Contracts;

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

                if(verificaVenda != null) throw new Exception("ID De venda não existe para exclusão");
                _vendaPersist.Delete(verificaVenda);

                if(await _vendaPersist.SaveChangesAsync()) return true;
                return false;
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
