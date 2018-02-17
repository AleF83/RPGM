using System;
using Newtonsoft.Json;

namespace RPGM.Core.Model
{
    public class Entity
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonRequired]
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("summary")]
        public string Summary { get; set; }

        [JsonProperty("description")]
        public string Description {get ;set;}

        public override string ToString() => $"Id: {Id}, Name: {Name}, Summary: {Summary}";
    }
}
