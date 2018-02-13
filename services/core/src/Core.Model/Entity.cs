﻿using System;
using Newtonsoft.Json;

namespace RPGM.Core.Model
{
    public class Entity
    {

        public Entity()
        {

        }

        public Entity(EntityCreationParams entityCreationParams)
        {
            Id = Guid.NewGuid().ToString();
            Name = entityCreationParams.Name;
            Summary = entityCreationParams.Summary;
            Description = entityCreationParams.Description;
        }

        [JsonRequired]
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
