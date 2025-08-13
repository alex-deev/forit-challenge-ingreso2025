FROM node:20.19.4-alpine3.22 AS build

RUN apk update

ENV DIR=/application

WORKDIR $DIR

COPY package*.json $DIR
##  npm ci is similar to install
RUN npm ci

COPY tsconfig*.json $DIR
COPY vite.config.ts $DIR
COPY public $DIR/public
COPY src $DIR/src
COPY index.html $DIR

## builds the application
RUN npm run build
## npm prune --production deletes all dev dependencies
RUN npm prune --production

###############################################################################

FROM nginx:alpine AS production
## Already has a non-root user and group (security)

ENV DIR=/application

## URL of the backend where the is listening API 
ENV APP_EXTERNAL_API_URL=http://localhost/api

## Copies the build files to Nginx's distribution folder 
COPY --from=build $DIR/dist /usr/share/nginx/html

# Copy the custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the entrypoint script and make it executable
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port 80 to the outside container
EXPOSE 80

# Start Nginx
CMD ["/docker-entrypoint.sh"]