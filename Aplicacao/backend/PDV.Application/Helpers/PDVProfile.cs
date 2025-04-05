using AutoMapper;
using PDV.Domain.Entities;
using PDV.Application.DTOs;

namespace PDV.Application.Helpers
{
    public class PDVProfile : Profile
    {
        public PDVProfile()
        {
            CreateMap<Venda, VendaDTO>().ReverseMap();
            CreateMap<Produto, ProdutoDTO>().ReverseMap();
            CreateMap<ItemVenda, ItensVendaDTO>().ReverseMap();
        }
    }
}