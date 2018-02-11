using System;
using System.Collections.Generic;
using System.IO;
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
            BASE_URL = $"{coreApiUrl}/api/entity";
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
    }
}