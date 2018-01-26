FROM node:8.9.4-alpine AS baseImage

# Stage 1: Collect dependencies
FROM baseImage AS nodeModulesImage

WORKDIR /artifacts/
COPY package.json yarn.lock ./
RUN yarn --prod

# Stage 2: Bundle client
FROM baseImage AS bundleImage

WORKDIR /artifacts/
COPY . ./
RUN yarn
RUN yarn build

# Stage 3: Create release image
FROM baseImage AS releaseImage

COPY --from=nodeModulesImage artifacts/package.json ./package.json
COPY --from=nodeModulesImage artifacts/node_modules ./node_modules
COPY --from=bundleImage artifacts/public ./public
COPY --from=bundleImage artifacts/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE ${PORT}

HEALTHCHECK --interval=10s --timeout=1s --start-period=2s --retries=3 CMD wget -q -t 3 --spider http://127.0.0.1:${PORT}/api/health || exit 1

ENTRYPOINT ["yarn", "start:server"]