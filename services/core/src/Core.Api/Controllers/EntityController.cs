using System;
using RPGM.Core.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace RPGM.Core.Api.Controllers
{
    [Route("api/entities")]
    public class EntityController : Controller
    {
        private readonly IEntityRepository _repository;

        public EntityController(IEntityRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IEnumerable<Entity> GetAll() => _repository.GetAll();

        [HttpGet]
        [Route("{entityId}")]
        public Entity Get([FromRoute]string entityId) => _repository.GetEntity(entityId);

        [HttpPost]        
        public Entity Create([FromBody]Dictionary<string, string> properties){
            Entity entity = new Entity{
                Id = Guid.NewGuid().ToString(),
                Name = properties.ContainsKey("name") ? properties["name"] : "Unnamed Entity",
                Description = properties.ContainsKey("description") ? properties["description"] : "No description",
            };
            _repository.AddEntity(entity);
            return entity;
        }

        [HttpPut]
        [Route("{entityId}")]
        public Entity Replace([FromRoute]string entityId, [FromBody]Entity entity) => _repository.UpdateEntity(entity);

        [HttpPatch]
        [Route("{entityId}")]
        public Entity Update([FromBody]Dictionary<string, object> propertiesToUpdate) => new Entity();

        [HttpDelete]
        public void DeleteAll() => _repository.RemoveAll();

        [HttpDelete]
        [Route("{entityId}")]
        public bool Delete([FromRoute]string entityId) => _repository.RemoveEntity(entityId);
    }
}