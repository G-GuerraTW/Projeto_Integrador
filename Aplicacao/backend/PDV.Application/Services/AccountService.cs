using PDV.Application.DTOs;
using PDV.Application.Contracts;
using Microsoft.AspNetCore.Identity;
using PDV.Domain.Identity;
using AutoMapper;
using PDV.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;

namespace PDV.Application.Services
{
    public class AccountService : IAccountService
    {
        private readonly IMapper mapper;
        private readonly UserPersist userPersist;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        public AccountService(SignInManager<User> signInManager, IMapper mapper, UserPersist userPersist, UserManager<User> userManager)
        {
            this.mapper = mapper;
            this.userManager = userManager;
            this.userPersist = userPersist;
            this.signInManager = signInManager;
            
        }
        public async Task<SignInResult> CheckUserPasswordAsync(string username, string password)
        {
            try
            {
                var validandoUserName = await userPersist.GetUserByUserNameAsync(username);
                if (validandoUserName == null) throw new Exception("Usename Não Existe.");

                return await signInManager.CheckPasswordSignInAsync(validandoUserName, password, false);
            }
            catch (Exception ex)
            {   
                throw new Exception($"Erro ao tentar Conta Logar, Erro: {ex.Message}");
            }
        }

        public async Task<UserDTO> CreateAccountAsync(UserDTO userDTO)
        {
            try
            {
                if (userDTO == null) throw new Exception("Dados inconsistente para cadastro de conta.");
                var user = mapper.Map<User>(userDTO);
                var result = await userManager.CreateAsync(user, userDTO.Password);

                if(result.Succeeded)
                {
                    var userRetorno = mapper.Map<UserDTO>(user);
                    return userRetorno;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao tentar Criar Conta, Erro: {ex.Message}");
            }
        }

        public async Task<UserUpdateDTO> UpdateAccount(UserUpdateDTO userUpdateDTO)
        {
            try
            {
                var user = await userPersist.GetUserByUserNameAsync(userUpdateDTO.UserName);
                if (user == null) throw new Exception("Username não encontrada para atualização");

                var token = await userManager.GeneratePasswordResetTokenAsync(user);
                var result = await userManager.ResetPasswordAsync(user, token, userUpdateDTO.Password);

                userPersist.Update(user);

                if(await userPersist.SaveChangesAsync())
                {
                    var userRetorno = await userPersist.GetUserByUserNameAsync(user.UserName);
                    return mapper.Map<UserUpdateDTO>(userRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {   
                throw new Exception($"Erro ao tentar Atualizar dados da Conta, Erro: {ex.Message}");
            }
        }

        public async Task<UserUpdateDTO> GetUserByUsernameAsync(string username)
        {
            try
            {
                if(username == null) throw new Exception("Impossivel de pesquisar um usuario nulo.");
                var user = await userPersist.GetUserByUserNameAsync(username.ToLower());
                return mapper.Map<UserUpdateDTO>(user);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao tentar Recuperar Conta por Username, Erro: {ex.Message}");
            }
        }

        public async Task<bool> UserExiste(string username)
        {
            try
            {
                return await userManager.Users.AnyAsync(U => U.UserName == username.ToLower());
            }
            catch (Exception ex)
            {   
                throw new Exception($"Erro ao tentar Verificar se o usuario existe, Erro: {ex.Message}");
            }
        }
    }
}