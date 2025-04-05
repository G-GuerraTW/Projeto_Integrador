
using AutoMapper;
using PDV.Application.Contracts;
using PDV.Application.DTOs;
using PDV.Domain.Entities;
using PDV.Persistence.Contracts;

namespace PDV.Application.Service
{
    public class ProdutoService : IProdutoService
    {
        private readonly IMapper _mapper;
        private readonly IGeralPersist GeralPersist;
        private readonly IProdutoPersist produtoPersist;
        public ProdutoService(IMapper _mapper,IGeralPersist GeralPersist, IProdutoPersist produtoPersist)
        {
            this.produtoPersist = produtoPersist;
            this.GeralPersist = GeralPersist;
            this._mapper = _mapper;
        }
        public async Task<ProdutoDTO> AddProduto(Produto model)
        {
            try
            {
                if(model == null) throw new Exception("Objeto Nulo ou Inválido");
                var produto = _mapper.Map<Produto>(model);
                GeralPersist.Add(produto);

                if(await GeralPersist.SaveChangesAsync()) 
                {
                    var ProdutoRetorno = await produtoPersist.GetProdutoByIDAsync(model.Id);
                    return _mapper.Map<ProdutoDTO>(ProdutoRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao persistir o cadastro de produto no banco: {ex.Message}");
            }
        }

        public Task<ProdutoDTO> UpdateEvento(int ProdutoId, Produto model)
        {
            try
            {
                
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }

        public Task<ProdutoDTO> DeleteEvento(int ProdutoID)
        {
            try
            {
                
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }

        public Task<ProdutoDTO[]> GetAllProdutByNameAsync(string Name)
        {
            try
            {
                
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }

        public Task<ProdutoDTO[]> GetAllProdutoAsync()
        {
            try
            {
                
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }

        public Task<ProdutoDTO[]> GetAllProdutoByCategoriaAsync(string Categoria)
        {
            try
            {
                
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }
    }
}