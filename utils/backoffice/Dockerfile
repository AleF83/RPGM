# Stage 1: Build
FROM node:8.9.4-alpine AS buildImage
WORKDIR /src
COPY package.json yarn.lock ./
RUN yarn
COPY . ./

ARG REACT_APP_REDIS_URL
ENV REACT_APP_REDIS_URL=${REACT_APP_REDIS_URL:-http://localhost:8101}

ARG REACT_APP_MINIO_URL
ENV REACT_APP_MINIO_URL=${REACT_APP_MINIO_URL:-http://localhost:9000}


ARG REACT_APP_MONGODB_URL
ENV REACT_APP_MONGODB_URL=${REACT_APP_MONGODB_URL:-http://localhost:8102}


RUN yarn build

# Stage 2: Release
FROM nginx:1.12.2-alpine AS releaseImage
COPY --from=buildImage /src/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]