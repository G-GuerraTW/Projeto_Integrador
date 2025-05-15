using Microsoft.EntityFrameworkCore;
using PDV.Domain.Identity;
using PDV.Persistence.Context;
using PDV.Persistence.Contracts;

namespace PDV.Persistence.Repositories
{
    public class UserPersist : GeralPersist, IUserPersist
    {
        private readonly PDVContext context;
        public UserPersist(PDVContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await context.Users.ToListAsync();
        }
        public async Task<User> GetUserByIdAsync(int id)
        {                               //faz uam pesquisa pela chave primaria, podendo ser chave primaria composta separando o parametro por > ",".  se não encontrar nada retornar null
            return await context.Users.FindAsync(id);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {                               //Espera que só exista um elemento que satisfaça a condição, Se encontrar mais de um, lança exceção, Se não encontrar nenhum, retorna null.
            return await context.Users.SingleOrDefaultAsync(U => U.nome == username);
        }
    }
}