using PDV.Persistence.Context;
using PDV.Persistence.Contracts;

namespace PDV.Persistence.Repositories
{
    public abstract class GeralPersist : IGeralPersist
    {
        private readonly PDVContext contexto;
        public GeralPersist(PDVContext contexto)
        {
            this.contexto = contexto;
        }
        public void Add<T>(T entity) where T : class
        {
            contexto.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            contexto.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            contexto.Remove(entity);
        }

        public void DeleteRange<T>(T[] entity) where T : class
        {
            contexto.RemoveRange(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await (contexto.SaveChangesAsync()) > 0;           
        }
    }
}