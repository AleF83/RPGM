using System.Collections.Generic;
using System.Threading.Tasks;
using RPGM.Core.Model;

namespace RPGM.Core.Api.Storage
{
	public interface IEntityRepository
    {
		Entity GetEntity(string entityId);

		Task<Entity> GetEntityAsync(string entityId);

		IEnumerable<Entity> GetAll();

		Task<List<Entity>> GetAllAsync();

		Entity AddEntity(Entity entity);

		Task<Entity> AddEntityAsync(Entity entity);

		bool DeleteEntity(string entityId);

		Task<bool> DeleteEntityAsync(string entityId);

		long DeleteAll();

		Task<long> DeleteAllAsync();

		Entity ReplaceEntity(Entity entity);

		Task<Entity> ReplaceEntityAsync(Entity entity);


    }
}