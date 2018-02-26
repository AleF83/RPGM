using System;
using System.IO;
using System.Threading.Tasks;

namespace RPGM.Core.Api.Storage
{
    public interface IImageRepository
    {
        Task GetImageAsync(string category, string imageName, Action<Stream> cb);
        
        Task SaveImageAsync(string category, string imageName, Stream imageStream, long size, string contentType);

        Task DeleteImageAsync(string category, string imageName);
    }
}