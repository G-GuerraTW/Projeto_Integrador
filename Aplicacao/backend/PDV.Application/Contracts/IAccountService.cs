using PDV.Application.DTOs;
using Microsoft.AspNetCore.Identity;

namespace PDV.Application.Contracts
{
    public interface IAccountService
    {
        Task<bool> UserExists(string username);
        Task<UserUpdateDTO> GetUserByUsernameAsync(string username);
        Task<UserUpdateDTO> GetUserByEmailAsync(string email);
        Task<SignInResult> CheckUserPasswordAsync(UserUpdateDTO userUpdateDTO, string password);
        Task<UserDTO> CreateAccountAsync(UserDTO userDTO);
        Task<UserUpdateDTO> UpdateAccount(UserUpdateDTO userUpdateDTO);
    }
}