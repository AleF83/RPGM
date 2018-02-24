using System;
using RPGM.Core.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using RPGM.Core.Api.Storage;

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
        public async Task<IEnumerable<Entity>> GetAll() => await _repository.GetAllAsync();

        [HttpGet]
        [Route("{entityId}")]
        public async Task<Entity> Get([FromRoute]string entityId) => await _repository.GetEntityAsync(entityId);

        [HttpPost]
        public async Task<Entity> Create([FromBody]Entity entity) => await _repository.AddEntityAsync(entity);

        [HttpPut]
        [Route("{entityId}")]
        public async Task<Entity> Replace([FromRoute]string entityId, [FromBody]Entity entity) => await _repository.ReplaceEntityAsync(entity);

        [HttpDelete]
        public async Task<long> DeleteAll() => await _repository.DeleteAllAsync();

        [HttpDelete]
        [Route("{entityId}")]
        public async Task<bool> Delete([FromRoute]string entityId) => await _repository.DeleteEntityAsync(entityId);
    }
}