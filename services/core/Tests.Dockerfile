FROM microsoft/dotnet:sdk

COPY . ./
RUN dotnet restore core.sln

WORKDIR /test/Core.Tests.Integration
RUN dotnet build

ENTRYPOINT ["dotnet", "test"]