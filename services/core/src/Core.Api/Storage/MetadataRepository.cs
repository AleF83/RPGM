using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using RPGM.Core.Api.Configuration;
using StackExchange.Redis;

namespace RPGM.Core.Api.Storage
{
	public class MetadataRepository : IMetadataRepository
	{
		private readonly IDatabase _db;

		public MetadataRepository(IOptions<RedisConfiguration> options)
		{
			var redis = ConnectionMultiplexer.Connect(options.Value.ConnectionString);
			_db = redis.GetDatabase();
		}

    	public IEnumerable<string> GetMetadata(string metadataType) => _db.ListRange(metadataType).Select(rv => rv.ToString());

    	public async Task<IEnumerable<string>> GetMetadataAsync(string metadataType) => await _db.ListRangeAsync(metadataType).ContinueWith(task => task.Result.Select(rv => rv.ToString()));
  }
}