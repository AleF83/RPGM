using System;
using Newtonsoft.Json;

namespace RPGM.Core.Model
{
    public class Entity
    {
        [JsonRequired]
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonRequired]
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description {get ;set;}

        public override string ToString()
        {
            return $"Id: {Id}, Name: {Name}";
        }
    }
}
