using AutoMapper;
using PDV.Domain.Entities;
using PDV.Application.DTOs;
using PDV.Domain.Identity;

namespace PDV.Application.Helpers
{
    public class PDVProfile : Profile
    {
        public PDVProfile()
        {
            CreateMap<VendaEntity, VendaDTO>().ReverseMap();
            CreateMap<ProdutoEntity, ProdutoDTO>().ReverseMap();
            CreateMap<ItemVendaEntity, ItensVendaDTO>().ReverseMap();

            // Mapemanento da Autorizção
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, UserLoginDTO>().ReverseMap();
            CreateMap<User, UserUpdateDTO>().ReverseMap();            
        }
    }
}