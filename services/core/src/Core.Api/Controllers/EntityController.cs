using System;
using RPGM.Core.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace RPGM.Core.Api.Controllers
{
    [Route("api")]
    public class EntityController : Controller
    {
        private readonly IEntityRepository _repository;

        public EntityController(IEntityRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("entity/{entityId}")]
        public Entity Get([FromRoute]string entityId)
        {
            Console.WriteLine($"E_id:{entityId}, Path: {Request.Path}");
            return _repository.GetEntity(entityId);
        }

        [HttpPost]
        [Route("entity")]
        public Entity Create([FromBody]Dictionary<string, string> properties){
            Entity entity = new Entity{
                Id = Guid.NewGuid().ToString(),
                Name = properties.ContainsKey("name") ? properties["name"] : "Unnamed Entity",
                Description = properties.ContainsKey("description") ? properties["description"] : "No description",
            };
            _repository.AddEntity(entity);
            Console.WriteLine($"{entity}");
            return entity;
        }

        [HttpPut]
        [Route("entity/{entityId}")]
        public Entity Replace([FromRoute]string entityId, [FromBody]Entity entity) => _repository.UpdateEntity(entity);

        [HttpPatch]
        [Route("entity/{entityId}")]
        public Entity Update([FromBody]Dictionary<string, object> propertiesToUpdate) => new Entity();

        [HttpDelete]
        [Route("entity/{entityId}")]
        public bool Delete([FromRoute]string entityId) => _repository.RemoveEntity(entityId);
    }
}