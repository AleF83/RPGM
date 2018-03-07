# Stage 1: Build
FROM node:8.9.4-alpine AS buildImage
WORKDIR /src
COPY package.json yarn.lock ./
RUN yarn
COPY . ./

ARG REACT_APP_AUTH_ENABLED
ENV REACT_APP_AUTH_ENABLED=${REACT_APP_AUTH_ENABLED:-false}

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL:-http://backend.localtest.me:8080}

RUN yarn build

# Stage 2: Release
FROM nginx:1.12.2-alpine AS releaseImage
COPY --from=buildImage /src/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]