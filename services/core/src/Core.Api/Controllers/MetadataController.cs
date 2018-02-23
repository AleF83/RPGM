using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace RPGM.Core.Api.Controllers
{
    [Route("api/metadata")]
    public class MetadataController : Controller
    {
		[HttpGet]
		[Route("{type}")]
		public IEnumerable<string> GetList([FromRoute] string type)
		{
			return new List<string> {
				"Character",
				"Mission",
				"Location",
			};
		}
    }
}