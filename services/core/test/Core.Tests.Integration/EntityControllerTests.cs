using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using RPGM.Core.Model;
using Xunit;

namespace RPGM.Core.Tests.Integration
{
    public class EntityControllerTest : IDisposable
    {
        private readonly HttpClient _client;

        private readonly string BASE_URL;

        public EntityControllerTest()
        {
            _client = new HttpClient();

            string coreApiUrl = Environment.GetEnvironmentVariable("CORE_API_URL");
            BASE_URL = $"{coreApiUrl}/api/entities";
        }

        public void Dispose()
        {
            if(_client != null)
            {
                _client.Dispose();
            }
        }

        [Theory]
        [InlineData("Aragorn", "Aragorn II, son of Arathorn is a fictional character from J. R. R. Tolkien's legendarium")]
        [InlineData("Boromir", "Boromir is a fictional character in J. R. R. Tolkien's legendarium")]
        public async Task CreateEntity(string name, string description)
        {
            var newEntity  = await CreateNewEntity(name, description);
            Assert.NotNull(newEntity);
            Assert.False(string.IsNullOrEmpty(newEntity.Id));
            Assert.Equal(name, newEntity.Name);
            Assert.Equal(description, newEntity.Description);

            await DeleteAllEntities();
        }

        [Theory]
        [InlineData("Aragorn", "Aragorn II, son of Arathorn is a fictional character from J. R. R. Tolkien's legendarium")]
        [InlineData("Boromir", "Boromir is a fictional character in J. R. R. Tolkien's legendarium")]

        public async Task GetEntity(string name, string description)
        {
            var newEntity  = await CreateNewEntity(name, description);
            using (var response = await _client.GetAsync($"{BASE_URL}/{newEntity.Id}"))
            {
                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();
                var entity = JsonConvert.DeserializeObject<Entity>(json);
                Assert.NotNull(newEntity);
                Assert.Equal(newEntity.Id, entity.Id);
                Assert.Equal(name, entity.Name);
                Assert.Equal(description, entity.Description);
            }
            await DeleteAllEntities();
        }

        [Fact]        
        public async Task GetAllEntities()
        {
            var data = new List<Tuple<string, string>> {
                new Tuple<string, string>("Frodo", "Frodo Baggins is a fictional character in J. R. R. Tolkien's legendarium, and one of the main protagonists of The Lord of the Rings."),
                new Tuple<string,string>("Sam", "Samwise is one of the main characters of The Lord of the Rings, in which he fills an archetypal role as the sidekick of the primary protagonist, Frodo Baggins.")
            };
            await Task.WhenAll(data.Select(async d => await CreateNewEntity(d.Item1, d.Item2)));
            using (var response = await _client.GetAsync(BASE_URL))
            {
                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();
                var entities = JsonConvert.DeserializeObject<IEnumerable<Entity>>(json);
                Assert.NotNull(entities);
                Assert.Equal(2, entities.Count());
            }
            await DeleteAllEntities();
        }

        [Theory]
        [InlineData("Aragorn", "Aragorn II, son of Arathorn is a fictional character from J. R. R. Tolkien's legendarium")]
        [InlineData("Boromir", "Boromir is a fictional character in J. R. R. Tolkien's legendarium")]

        public async Task DeleteEntity(string name, string description)
        {
            var newEntity  = await CreateNewEntity(name, description);
            using (var response = await _client.DeleteAsync($"{BASE_URL}/{newEntity.Id}"))
            {
                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();
                var wasDeleted = JsonConvert.DeserializeObject<bool>(json);
                Assert.True(wasDeleted);
            }
        }


        private async Task<Entity> CreateNewEntity(string name, string description)
        {
            var properties = new Dictionary<string, string>
            {
                ["name"] = name,
                ["description"] = description
            };

            using (var response = await _client.PostAsync(BASE_URL, new JsonContent(properties)))
            {
                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();
                var newEntity = JsonConvert.DeserializeObject<Entity>(json);
                return newEntity;
            }
        }

        private async Task DeleteAllEntities()
        {
            using (var response = await _client.DeleteAsync(BASE_URL))
            {
                response.EnsureSuccessStatusCode();                
            }
        }
    }
}