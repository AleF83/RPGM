using Microsoft.AspNetCore.Mvc;

namespace Core.Api.Controllers
{
    [Route("health")]
    public class HealthController : Controller
    {
        [HttpGet]
        public string Get()
        {
            return "true";
        }
    }
}