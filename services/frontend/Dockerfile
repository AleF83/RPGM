FROM node:8.9.4-alpine AS baseImage

FROM baseImage AS nodeModulesImage
WORKDIR /artifacts/
COPY package.json ./
COPY yarn.lock ./
RUN yarn --prod

FROM baseImage AS bundleImage
WORKDIR /artifacts/
COPY . ./
RUN yarn
RUN yarn build

FROM baseImage AS releaseImage
COPY --from=nodeModulesImage artifacts/package.json ./package.json
COPY --from=nodeModulesImage artifacts/node_modules ./node_modules
COPY --from=bundleImage artifacts/build ./build
COPY --from=bundleImage artifacts/dist ./dist

ENV NODE_ENV=production

EXPOSE 3000

CMD ["yarn", "start:release"]