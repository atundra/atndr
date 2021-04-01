FROM node:14.16.0-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html
