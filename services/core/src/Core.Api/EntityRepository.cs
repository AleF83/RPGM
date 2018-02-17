using System;
using System.Collections.Generic;
using RPGM.Core.Model;

namespace RPGM.Core.Api
{
    public interface IEntityRepository
    {
        IEnumerable<EntitySummary> GetAll();

        Entity GetEntity(string entityId);

        Entity AddEntity(Entity entity);

        Entity UpdateEntity(Entity entity);

        bool RemoveEntity(string entityId);

        void RemoveAll();
        
    }

    public class EntityRepository : IEntityRepository
    {
        static EntityRepository() => Instance = new EntityRepository();

        public static EntityRepository Instance { get; private set; }

        private IDictionary<string, EntitySummary> _summaries;
        private IDictionary<string, Entity> _entitites;
        private EntityRepository()
        {
            _entitites = new Dictionary<string, Entity>();
            _summaries = new Dictionary<string, EntitySummary>();
        }

        public IEnumerable<EntitySummary> GetAll() => _summaries.Values;

        public Entity GetEntity(string entityId) =>  _entitites.ContainsKey(entityId) ? _entitites[entityId] : null;

        public Entity AddEntity(Entity entity)
        {
            if(string.IsNullOrEmpty(entity.Id))
            {
              entity.Id = Guid.NewGuid().ToString();
            }
            _entitites.Add(entity.Id, entity);
            
            var summary = new EntitySummary(entity);
            _summaries.Add(summary.Id, summary);
            return entity;
        } 

        public Entity UpdateEntity(Entity entity)
        {
            _summaries[entity.Id] = new EntitySummary(entity);
            return _entitites[entity.Id] = entity;
        }

        public bool RemoveEntity(string entityId) 
        {
            _summaries.Remove(entityId);
            return _entitites.Remove(entityId);
        }

        public void RemoveAll()
        {
            _entitites.Clear();
            _summaries.Clear();
        } 
    }
    
}