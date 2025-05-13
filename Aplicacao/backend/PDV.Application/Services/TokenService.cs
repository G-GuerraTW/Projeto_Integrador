using AutoMapper;
using System.Text;
using PDV.Domain.Identity;
using PDV.Application.DTOs;
using System.Security.Claims;
using PDV.Application.Contracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;

namespace PDV.Application.Services
{
    public class TokenService : ITokenService
    {
        private readonly IMapper mapper;
        private readonly SymmetricSecurityKey key;
        private readonly IConfiguration configuration;
        private readonly UserManager<User> userManager;
        public TokenService(IConfiguration configuration, UserManager<User> userManager, IMapper mapper)
        {
            this.userManager = userManager;
            this.mapper = mapper;
            this.configuration = configuration;
            this.key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"]));
        }
        public async Task<string> CreateToken(UserUpdateDTO userUpdateDTO)
        {
            var user = mapper.Map<User>(userUpdateDTO);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Email)
            };

            var roles = await userManager.GetRolesAsync(user);

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescription);

            return tokenHandler.WriteToken(token);
        }
    }
}