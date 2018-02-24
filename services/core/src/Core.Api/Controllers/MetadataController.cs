using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RPGM.Core.Api.Storage;

namespace RPGM.Core.Api.Controllers
{
	[Route("api/metadata")]
	public class MetadataController : Controller
	{
		private readonly IMetadataRepository _metadataRepository;

		public MetadataController(IMetadataRepository metadataRepository)
		{
			_metadataRepository = metadataRepository;
		}

		[HttpGet]
		[Route("{type}")]
		public async Task<IEnumerable<string>> GetList([FromRoute] string type)
		{
			return await _metadataRepository.GetMetadataAsync(type);
		}
	}
}