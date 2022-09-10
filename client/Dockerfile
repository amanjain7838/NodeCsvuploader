FROM node:lts-slim as build-deps
USER root
RUN mkdir -p /usr/src/app/web && chown -R node:node /usr/src/app/web
WORKDIR /usr/src/app/web
COPY package.json package-lock.json ./
RUN npm ci --production --legacy-peer-deps
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
COPY . ./
RUN npm run build

FROM nginx:1.12-alpine
COPY nginx-prod.conf /etc/nginx/conf.d/default.conf
COPY --from=build-deps /usr/src/app/web/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]