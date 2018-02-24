using System.Collections.Generic;
using System.Threading.Tasks;

namespace RPGM.Core.Api.Storage
{
	public interface IMetadataRepository
	{
		IEnumerable<string> GetMetadata(string metadataType);

		Task<IEnumerable<string>> GetMetadataAsync(string metadataType);
	}
}