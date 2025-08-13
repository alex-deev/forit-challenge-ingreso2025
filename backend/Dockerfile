FROM node:20.19.4-alpine3.22 AS build

RUN apk update

RUN apk add --no-cache libc6-compat
RUN apk add --no-cache dumb-init 

ENV DIR=/server
WORKDIR $DIR

COPY package*.json $DIR
##  npm ci is similar to install
RUN npm ci

COPY tsconfig*.json $DIR
COPY src $DIR/src

## builds the application
RUN npm run build
## npm prune --production deletes all dev dependencies
RUN npm prune --production

###############################################################################

FROM build AS production

## Create a non-root user and group (security)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

## Copies the dumb-init app, node_modules and the working directory 
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/dist $DIR/dist

## Change the ownership of the application directory to the new user (security)
RUN chown -R appuser:appgroup $DIR
## Switch to the non-root user (security)
USER appuser

ENV APP_PORT=3000
EXPOSE $APP_PORT

CMD ["dumb-init", "node", "dist/server.js"]