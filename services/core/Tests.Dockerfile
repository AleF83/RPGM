FROM microsoft/dotnet:2.0.4-sdk-2.1.3-stretch

COPY . ./
RUN dotnet restore core.sln

WORKDIR /test/Core.Tests.Integration
RUN dotnet build

ENTRYPOINT ["dotnet", "test"]