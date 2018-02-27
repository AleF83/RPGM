FROM microsoft/dotnet:2.0.5-sdk-2.1.4-stretch

COPY . ./
RUN dotnet restore core.sln

WORKDIR /test/Core.Tests.Integration
RUN dotnet build

ENTRYPOINT ["dotnet", "test"]