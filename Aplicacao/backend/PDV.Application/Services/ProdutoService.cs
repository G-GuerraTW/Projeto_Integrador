using AutoMapper;
using PDV.Application.Contracts;
using PDV.Application.DTOs;
using PDV.Domain.Entities;
using PDV.Persistence.Contracts;

namespace PDV.Application.Services
{
    public class ProdutoService : IProdutoService
    {
        private readonly IMapper _mapper;
        private readonly IProdutoPersist _produtoPersist;
        public ProdutoService(
            IMapper mapper,
            IProdutoPersist produtoPersist)
        {
            _produtoPersist = produtoPersist;
            _mapper = mapper;
        }
        public async Task<ProdutoDTO> AddProduto(ProdutoDTO model)
        {
            try
            {
                if (model == null)
                    throw new Exception("Objeto Nulo ou Inválido");

                var entity = _mapper.Map<ProdutoEntity>(model);
                _produtoPersist.Add(entity);

                if (await _produtoPersist.SaveChangesAsync())
                {
                    var produtoEntity = await _produtoPersist.GetProdutoByIDAsync(model.Id);
                    return _mapper.Map<ProdutoDTO>(produtoEntity);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao persistir o cadastro de produto no banco: {ex.Message}");
            }
        }

        public async Task<ProdutoDTO> UpdateProduto(int produtoId, ProdutoDTO model)
        {
            try
            {
                if (model == null)
                    throw new Exception("Objeto Nulo ou Inválido");

                var modelUpdate = await _produtoPersist.GetProdutoByIDAsync(produtoId) ??
                                  throw new Exception($"Não foi possível encontrar um produto de Id: {produtoId}");

                _mapper.Map(model, modelUpdate);

                _produtoPersist.Update(modelUpdate);

                if (await _produtoPersist.SaveChangesAsync())
                    return _mapper.Map<ProdutoDTO>(modelUpdate);

                return _mapper.Map<ProdutoDTO>(modelUpdate);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao atualizar o produto: {ex.Message}");
            }
        }

        public async Task<bool> DeleteProduto(int produtoID)
        {
            try
            {
                var verificaProduto = await _produtoPersist.GetProdutoByIDAsync(produtoID);
                if (verificaProduto == null) 
                    throw new Exception("Produto não existente para ser apagado.");

                _produtoPersist.Delete(verificaProduto);

                if(await _produtoPersist.SaveChangesAsync()) return true;
                return false;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao remover o produto: {ex.Message}");
            }
        }

        public async Task<ProdutoDTO> GetProdutoByIDAsync(int id)
        {
            try
            {
                var produto = await _produtoPersist.GetProdutoByIDAsync(id);

                return _mapper.Map<ProdutoDTO>(produto);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao buscar os produtos pelo nome: {ex.Message}");
            }
        }

        public async Task<ProdutoDTO[]> GetAllProdutByNameAsync(string name)
        {
            try
            {
                var produtos = await _produtoPersist.GetAllProdutByNameAsync(name);

                return _mapper.Map<ProdutoDTO[]>(produtos);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao buscar os produtos pelo nome: {ex.Message}");
            }
        }

        public async Task<ProdutoDTO[]> GetAllProdutoAsync()
        {
            try
            {
                var produtosRetorno = await _produtoPersist.GetAllProdutoAsync();
                return _mapper.Map<ProdutoDTO[]>(produtosRetorno);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao buscar os produtos: {ex.Message}");
            }
        }

        public async Task<ProdutoDTO[]> GetAllProdutoByCategoriaAsync(string categoria)
        {
            try
            {
                var produtos = await _produtoPersist.GetAllProdutoByCategoriaAsync(categoria);

                return _mapper.Map<ProdutoDTO[]>(produtos);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao buscar os produtos pela categoria: {ex.Message}");
            }
        }
    }
}