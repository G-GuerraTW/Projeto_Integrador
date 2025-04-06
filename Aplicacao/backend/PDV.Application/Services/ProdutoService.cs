
using AutoMapper;
using PDV.Application.Contracts;
using PDV.Application.DTOs;
using PDV.Domain.Entities;
using PDV.Persistence.Contracts;
using System.Xml.Linq;

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
        public async Task<ProdutoDTO> AddProduto(ProdutoEntity model)
        {
            try
            {
                if (model == null) throw new Exception("Objeto Nulo ou Inválido");
                _produtoPersist.Add(model);

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

        public async Task<ProdutoDTO> UpdateEvento(int produtoId, ProdutoEntity model)
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

        public async void DeleteEvento(int produtoID)
        {
            try
            {
                _produtoPersist.Delete(produtoID);

                await _produtoPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao remover o produto: {ex.Message}");
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
                var produtos = await _produtoPersist.GetAllProdutoAsync();

                return _mapper.Map<ProdutoDTO[]>(produtos);
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