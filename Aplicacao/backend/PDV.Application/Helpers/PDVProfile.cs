using AutoMapper;
using PDV.Domain.Entities;
using PDV.Application.DTOs;

namespace PDV.Application.Helpers
{
    public class PDVProfile : Profile
    {
        public PDVProfile()
        {
            CreateMap<VendaEntity, VendaDTO>().ReverseMap();
            CreateMap<ProdutoEntity[], ProdutoDTO[]>().ReverseMap();
            CreateMap<ProdutoEntity, ProdutoDTO>().ReverseMap();
            CreateMap<ItemVendaEntity, ItensVendaDTO>().ReverseMap();
        }
    }
}