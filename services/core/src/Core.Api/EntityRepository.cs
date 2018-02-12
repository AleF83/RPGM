using System;
using System.Collections.Generic;
using RPGM.Core.Model;

namespace RPGM.Core.Api
{
    public interface IEntityRepository
    {
        IEnumerable<Entity> GetAll();

        Entity GetEntity(string entityId);

        void AddEntity(Entity entity);

        Entity UpdateEntity(Entity entity);

        bool RemoveEntity(string entityId);

        void RemoveAll();
        
    }

    public class EntityRepository : IEntityRepository
    {
        static EntityRepository() => Instance = new EntityRepository();

        public static EntityRepository Instance { get; private set; }

        private IDictionary<string, Entity> _entitites;
        private EntityRepository()
        {
            _entitites = new Dictionary<string, Entity>();
        }

        public IEnumerable<Entity> GetAll() => _entitites.Values;

        public Entity GetEntity(string entityId) =>  _entitites.ContainsKey(entityId) ? _entitites[entityId] : null;

        public void AddEntity(Entity entity) => _entitites.Add(entity.Id, entity);

        public Entity UpdateEntity(Entity entity) => _entitites[entity.Id] = entity;

        public bool RemoveEntity(string entityId) => _entitites.Remove(entityId);

        public void RemoveAll() => _entitites.Clear();
    }
    
}