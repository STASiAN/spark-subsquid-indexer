# community node image
FROM node:16-alpine AS node

### add build deps
FROM node AS node-with-gyp
RUN apk add g++ make python3

### builder
FROM node-with-gyp AS builder
WORKDIR /squid

ADD abi abi
ADD *.json .
ADD schema.graphql .
ADD src src

RUN npm i -g @subsquid/cli@latest
RUN npm ci

# RUN sqd build --- seems like broken deps

### add build deps
FROM node-with-gyp AS deps
WORKDIR /squid

ADD package.json .
ADD package-lock.json .
RUN npm ci --production

FROM node AS squid
WORKDIR /squid

COPY --from=builder /squid/abi abi
# COPY --from=builder /squid/lib lib
COPY --from=builder /squid/schema.graphql schema.graphql

COPY --from=deps /squid/node_modules node_modules

ADD *.json .

# RUN echo -e "loglevel=silent\\nupdate-notifier=false" > /squid/.npmrc
RUN npm i -g @subsquid/cli@latest
# CMD ["sqd"]
