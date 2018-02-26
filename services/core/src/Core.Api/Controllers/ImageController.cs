using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RPGM.Core.Api.Storage;

namespace RPGM.Core.Api.Controllers
{
    [Route("api/images")]
    public class ImageController : Controller
    {
        private readonly IImageRepository _repository;

        public ImageController(IImageRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("{category}/{imageName}")]
        public async Task<IActionResult> GetImage([FromRoute]string category, [FromRoute]string imageName)
        {   
            var responseStream = new MemoryStream();
            await _repository.GetImageAsync(category, imageName, stream => {
                stream.CopyTo(responseStream);                    
            });
            responseStream.Seek(0, SeekOrigin.Begin);
            return new FileStreamResult(responseStream, "image/jpg");
        }

        [HttpPost]
        [Route("{category}/{imageName}")]
        public async Task SaveImage([FromRoute]string category, [FromRoute]string imageName)
        {
            
            using(var stream = Request.Body)
            {
                await _repository.SaveImageAsync(category, imageName, stream, Request.ContentLength.Value, Request.ContentType);
            }            
        }

        [HttpDelete]
        [Route("{category}/{imageName}")]
        public async Task DeleteImage([FromRoute]string category, [FromRoute]string imageName)
        {
            await _repository.DeleteImageAsync(category, imageName);
        }
    }
}