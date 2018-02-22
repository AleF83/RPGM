using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Bson.Serialization.Serializers;
using Newtonsoft.Json;

namespace RPGM.Core.Model
{
    public class Entity
    {		
        [JsonProperty("id")]
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }        

        [JsonRequired]
        [JsonProperty("name")]
		[BsonElement("name")]
        [BsonRequired]
        public string Name { get; set; }

        [JsonProperty("summary")]
		[BsonElement("summary")]
        public string Summary { get; set; }

        [JsonProperty("description")]
		[BsonElement("description")]
        public string Description {get ;set;}

        public override string ToString() => $"Id: {Id}, Name: {Name}, Summary: {Summary}";
    }
}
