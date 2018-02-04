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
        private static string _entityId;

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

        [Fact]
        public async Task CreateEntity()
        {
            var properties = new Dictionary<string,string> {
                { "name", "Aragorn" },
            };
            using (var response = await _client.PostAsync(BASE_URL, new JsonContent(properties)))
            {
                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();
                var newEntity = JsonConvert.DeserializeObject<Entity>(json);
                Assert.NotNull(newEntity);
                Assert.False(string.IsNullOrEmpty(newEntity.Id));
                Assert.Equal("Aragorn", newEntity.Name);
                _entityId = newEntity.Id;
                Console.WriteLine($"ENTITY_ID:{_entityId}");
            }
        }

        [Fact]
        public async Task GetEntity()
        {
            Console.WriteLine($"ENTITY_ID:{_entityId}");
            using (var response = await _client.GetAsync($"{BASE_URL}/{_entityId}"))
            {
                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();
                var newEntity = JsonConvert.DeserializeObject<Entity>(json);
                Assert.NotNull(newEntity);
                Assert.Equal("Aragorn", newEntity.Name);

            }
        }

        [Fact]
        public async Task DeleteEntity()
        {
            using (var response = await _client.DeleteAsync($"{BASE_URL}/{_entityId}"))
            {
                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();
                var wasDeleted = JsonConvert.DeserializeObject<bool>(json);
                Assert.True(wasDeleted);
            }
        }
    }
}