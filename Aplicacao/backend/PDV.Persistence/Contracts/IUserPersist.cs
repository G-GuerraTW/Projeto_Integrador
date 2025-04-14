using PDV.Domain.Identity;

namespace PDV.Persistence.Contracts
{
    public interface IUserPersist : IGeralPersist
    {
        public Task<IEnumerable<User>> GetUsersAsync();
        public Task<User> GetUserByIdAsync(int id);
        public Task<User> GetUserByUserNameAsync(string userName);
    }
}