# Stage 1: Collect dependencies
FROM golang:1.9.2 AS dependenciesImage

ARG DEP_VERSION=0.3.2

WORKDIR /go/src/github.com/AleF83/RPGM/services/backend
COPY Gopkg.toml ./Gopkg.toml
COPY Gopkg.lock ./Gopkg.lock

RUN update-ca-certificates \
    && curl -fsSL -o /usr/local/bin/dep https://github.com/golang/dep/releases/download/v${DEP_VERSION}/dep-linux-amd64 \
    && chmod +x /usr/local/bin/dep \
    && dep ensure -v -vendor-only


# Stage 2: Build executable
FROM dependenciesImage AS buildImage
 
WORKDIR /go/src/github.com/AleF83/RPGM/services/backend
COPY . ./
COPY healthcheck ./healthcheck

RUN CGO_ENABLED=0 go build -a -installsuffix cgo -o server
RUN CGO_ENABLED=0 go build -a -installsuffix cgo -o health-check "github.com/AleF83/RPGM/services/backend/healthcheck"

# Stage 3: Create release image
FROM scratch AS releaseImage

COPY --from=buildImage /go/src/github.com/AleF83/RPGM/services/backend/server /server
COPY --from=buildImage /go/src/github.com/AleF83/RPGM/services/backend/config /config
COPY --from=buildImage /go/src/github.com/AleF83/RPGM/services/backend/health-check /healthcheck

ENV PORT=80
EXPOSE ${PORT}

HEALTHCHECK --interval=10s --timeout=1s --start-period=5s --retries=3 CMD [ "/healthcheck" ]

ENTRYPOINT [ "/server" ]