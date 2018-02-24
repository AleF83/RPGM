using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using RPGM.Core.Api.Configuration;
using RPGM.Core.Api.Storage;

namespace RPGM.Core.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddSingleton<IMongoClient, MongoClient>();
            services.Configure<MongoDBConfiguration>(options => {
                options.ConnectionString = Configuration.GetSection("Storage:MongoDB:ConnectionString").Value;
                options.Database = Configuration.GetSection("Storage:MongoDB:Database").Value;
            });
            services.Configure<RedisConfiguration>(options => {
                options.ConnectionString = Configuration.GetSection("Storage:Redis:ConnectionString").Value;
            });

            services.AddOptions();
            services.AddSingleton<IEntityRepository, EntityRepository>();
            services.AddSingleton<IMetadataRepository, MetadataRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
        }
    }
}
