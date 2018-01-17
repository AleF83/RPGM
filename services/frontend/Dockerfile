FROM node:8.9.4-alpine AS baseImage

FROM baseImage AS nodeModulesImage
WORKDIR /artifacts/
COPY package.json yarn.lock ./
RUN yarn --prod

FROM baseImage AS bundleImage
WORKDIR /artifacts/
COPY . ./
RUN yarn
RUN yarn build

FROM baseImage AS releaseImage
COPY --from=nodeModulesImage artifacts/package.json ./package.json
COPY --from=nodeModulesImage artifacts/node_modules ./node_modules
COPY --from=bundleImage artifacts/public ./public
COPY --from=bundleImage artifacts/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE ${PORT}

HEALTHCHECK --interval=10s --timeout=1s --start-period=2s --retries=3 CMD curl http://127.0.0.1:${PORT}/api/health || exit 1

ENTRYPOINT ["yarn", "start:server"]