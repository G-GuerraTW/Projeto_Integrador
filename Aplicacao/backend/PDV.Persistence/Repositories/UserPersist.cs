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
        {
            return await context.Users.FindAsync(id);
        }

        public async Task<User> GetUserByUserNameAsync(string userName)
        {
            return await context.Users.SingleOrDefaultAsync(U => U.UserName == userName);
        }
    }
}