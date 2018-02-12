# Stage 1: Copy csproj files
FROM debian:stable-slim AS csprojImage
COPY . ./
RUN mkdir csproj && cp --parent ./src/**/*.csproj /csproj

# Stage 1: Build
FROM microsoft/aspnetcore-build:2.0.4-2.1.3 AS buildImage

COPY  --from=csprojImage /csproj /build
COPY . /build
WORKDIR /build/src/Core.Api
RUN dotnet restore
RUN dotnet publish --output /dist/ --configuration Release

# Stage 2: Release
FROM microsoft/aspnetcore:2.0.4 AS releaseImage

WORKDIR /app
COPY --from=buildImage /dist .

ENV PORT=80
EXPOSE ${PORT}

HEALTHCHECK --interval=30s \
            --timeout=30s \
            --start-period=5s \
            --retries=3 \
            CMD curl -f http://localhost:${PORT}/health || exit 1

ENTRYPOINT ["dotnet", "Core.Api.dll"]