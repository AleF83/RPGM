using System;
using Newtonsoft.Json;

namespace RPGM.Core.Model
{
    public class EntitySummary
    {
        public EntitySummary()
        {
        }

        public EntitySummary(Entity entity)
        {
            Id = entity.Id;
            Name = entity.Name;
            Summary = entity.Summary;
        }

        [JsonRequired]
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonRequired]
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("summary")]
        public string Summary { get; set; }

        public override string ToString() => $"Id: {Id}, Name: {Name}, Summary: {Summary}";
    }
}
