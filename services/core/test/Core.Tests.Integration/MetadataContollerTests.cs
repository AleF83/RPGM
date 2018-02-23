using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Xunit;

namespace RPGM.Core.Tests.Integration
{
	public class MetadataControllerTests : IDisposable
	{
		private readonly HttpClient _client;

        private readonly string BASE_URL;

        public MetadataControllerTests()
        {
            _client = new HttpClient();

            string coreApiUrl = Environment.GetEnvironmentVariable("CORE_API_URL");
            BASE_URL = $"{coreApiUrl}/api/metadata";
        }

        public void Dispose()
        {
            if(_client != null)
            {
                _client.Dispose();
            }
        }

		[Fact]
        public async Task GetAllEntities()
        {
            using (var response = await _client.GetAsync($"{BASE_URL}/entityTypes"))
            {
                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();
                var entityTypes = JsonConvert.DeserializeObject<IEnumerable<string>>(json);
                Assert.NotNull(entityTypes);
                Assert.Equal(3, entityTypes.Count());
            }
        }
	}
}