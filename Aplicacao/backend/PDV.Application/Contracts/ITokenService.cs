using PDV.Application.DTOs;

namespace PDV.Application.Contracts
{
    public interface ITokenService
    {
        Task<string> CreateToken(UserUpdateDTO userUpdateDTO);
    }
}