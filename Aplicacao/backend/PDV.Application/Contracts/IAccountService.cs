using Microsoft.AspNetCore.Identity;
using PDV.Application.DTOs;

namespace PDV.Application.Contracts
{
    public interface IAccountService
    {
        Task<bool> UserExiste(string username);
        Task<UserUpdateDTO> GetUserByUsernameAsync(string username);
        Task<SignInResult> CheckUserPasswordAsync(string username, string password);
        Task<UserDTO> CreateAccountAsync(UserDTO userDTO);
        Task<UserUpdateDTO> UpdateAccount(UserUpdateDTO userUpdateDTO);
    }
}