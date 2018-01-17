# Stage 1: Build executable
FROM golang:1.9.2 as buildImage
 
WORKDIR /go/src/github.com/AleF83/RPGM/services/backend
COPY main.go .
COPY healthcheck ./healthcheck

RUN CGO_ENABLED=0 go build -a -installsuffix cgo -o server
RUN CGO_ENABLED=0 go build -a -installsuffix cgo -o health-check "github.com/AleF83/RPGM/services/backend/healthcheck"

# Stage 2: Create release image
FROM scratch as releaseImage

COPY --from=buildImage /go/src/github.com/AleF83/RPGM/services/backend/server ./server
COPY --from=buildImage /go/src/github.com/AleF83/RPGM/services/backend/health-check ./healthcheck

ENV PORT=80
EXPOSE ${PORT}

HEALTHCHECK --interval=10s --timeout=1s --start-period=5s --retries=3 CMD [ "/healthcheck" ]

ENTRYPOINT [ "/server" ]