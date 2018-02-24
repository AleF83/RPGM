using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using RPGM.Core.Model;
using RPGM.Core.Api.Configuration;
using Microsoft.Extensions.Options;

namespace RPGM.Core.Api.Storage
{
	public class EntityRepository : IEntityRepository
	{
		private IMongoCollection<Entity> _entityCollection;

		public EntityRepository(IOptions<MongoDBConfiguration> configuration)
		{
			var client = new MongoClient(configuration.Value.ConnectionString);
			var database = client.GetDatabase(configuration.Value.Database);
			_entityCollection = database.GetCollection<Entity>("entities");
		}

		public Entity AddEntity(Entity entity)
		{
			_entityCollection.InsertOne(entity);
			return entity;
		}

		public async Task<Entity> AddEntityAsync(Entity entity)
		{
			return await _entityCollection.InsertOneAsync(entity).ContinueWith(task => entity);
		}

		public long DeleteAll()
		{
			return _entityCollection.DeleteMany(Builders<Entity>.Filter.Empty).DeletedCount;
		}

		public Task<long> DeleteAllAsync()
		{
			return _entityCollection.DeleteManyAsync(Builders<Entity>.Filter.Empty).ContinueWith(task => task.Result.DeletedCount);
		}

		public bool DeleteEntity(string entityId)
		{
			var filter = Builders<Entity>.Filter.Eq("_id", ObjectId.Parse(entityId));
			return _entityCollection.DeleteOne(filter).DeletedCount == 1;
		}

		public async Task<bool> DeleteEntityAsync(string entityId)
		{
			var filter = Builders<Entity>.Filter.Eq("_id", ObjectId.Parse(entityId));
			return await _entityCollection.DeleteOneAsync(filter).ContinueWith(task => task.Result.DeletedCount == 1);
		}

		public IEnumerable<Entity> GetAll()
		{
			return _entityCollection.Find(Builders<Entity>.Filter.Empty).ToList();
		}

		public async Task<List<Entity>> GetAllAsync()
		{
			return await _entityCollection.Find(Builders<Entity>.Filter.Empty).ToListAsync();
		}

		public Entity GetEntity(string entityId)
		{
			var filter = Builders<Entity>.Filter.Eq("_id", ObjectId.Parse(entityId));
			return _entityCollection.Find(filter).Single();
		}

		public async Task<Entity> GetEntityAsync(string entityId)
		{
			var filter = Builders<Entity>.Filter.Eq("_id", ObjectId.Parse(entityId));
			return await _entityCollection.Find(filter).SingleAsync();
		}

		public Entity ReplaceEntity(Entity entity)
		{
			var filter = Builders<Entity>.Filter.Eq("_id", ObjectId.Parse(entity.Id));
			return _entityCollection.ReplaceOne(filter, entity).ModifiedCount == 1 ? entity : null;
		}

		public async Task<Entity> ReplaceEntityAsync(Entity entity)
		{
			var filter = Builders<Entity>.Filter.Eq("_id", ObjectId.Parse(entity.Id));
			return await _entityCollection.ReplaceOneAsync(filter, entity).ContinueWith(task => task.Result.ModifiedCount == 1 ? entity : null);
		}
	}
}