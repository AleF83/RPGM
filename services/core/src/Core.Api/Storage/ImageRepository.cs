using Microsoft.Extensions.Options;
using RPGM.Core.Api.Configuration;
using Minio;
using System.IO;
using System.Threading.Tasks;
using System;

namespace RPGM.Core.Api.Storage
{
    public class ImageRepository : IImageRepository
    {
        private readonly string _bucketName;
        private readonly MinioClient _client;

        public ImageRepository(IOptions<MinioConfiguration> options)
        {
            _bucketName = options.Value.BucketName;
            _client = new MinioClient(options.Value.Endpoint, options.Value.AccessKey, options.Value.SecretKey);
        }

        public async Task GetImageAsync(string category, string imageName, Action<Stream> cb) => await _client.GetObjectAsync(_bucketName, $"{category}/{imageName}", cb);

        public async Task SaveImageAsync(string category, string imageName, Stream imageStream, long size, string contentType) => await _client.PutObjectAsync(_bucketName, $"{category}/{imageName}", imageStream, size, contentType);

        public async Task DeleteImageAsync(string category, string imageName) => await _client.RemoveObjectAsync(_bucketName, $"{category}/{imageName}");
    }
}