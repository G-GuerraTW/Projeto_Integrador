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
<<<<<<< HEAD
            CreateMap<ItemVendaEntity, ItensVendaDTO>().ReverseMap();

            // Mapemanento da Autorizção
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, UserLoginDTO>().ReverseMap();
            CreateMap<User, UserUpdateDTO>().ReverseMap();            
=======
            CreateMap<ItemVendaEntity, ItemVendaDTO>().ReverseMap();
>>>>>>> 4ed2af4e31243ebdcbac8ceb57f90e0a1e0eaa39
        }
    }
}