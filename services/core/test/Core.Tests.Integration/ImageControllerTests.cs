using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace RPGM.Core.Tests.Integration
{
    public class ImageControllerTest : IDisposable
    {
        private readonly HttpClient _client;

        private readonly string BASE_URL;

        public ImageControllerTest()
        {
            _client = new HttpClient();

            string coreApiUrl = Environment.GetEnvironmentVariable("CORE_API_URL");
            BASE_URL = $"{coreApiUrl}/api/images";
        }

        public void Dispose()
        {
            if(_client != null)
            {
                _client.Dispose();
            }
        }

        [Theory]
        [InlineData("OrcAvatar.jpg")]
        public async Task UploadImage(string imageFilePath)
        {
            var imageBytes = await File.ReadAllBytesAsync(imageFilePath);

            ByteArrayContent imageContent = new ByteArrayContent(imageBytes);

            MultipartFormDataContent multiContent = new MultipartFormDataContent();
            multiContent.Add(imageContent);


            using (var response = await _client.PostAsync($"{BASE_URL}/avatars/my_character_avatar", imageContent))
            {
                response.EnsureSuccessStatusCode();                
            }
        }
    }
}