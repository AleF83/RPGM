# Stage 2:
FROM node:8.9.4-alpine AS testImage

RUN apk add --no-cache jq python gcc g++ make

WORKDIR /src

COPY package.json yarn.lock ./
RUN yarn
COPY . ./

CMD ["yarn", "test"]
