FROM node:10.14.2-alpine AS build
WORKDIR /app
COPY ["./client/package.json", "./client/package-lock.json*", "./"]
RUN npm install
COPY ./client/ .
RUN npm run build:prod

FROM nginx:1.10.3
COPY --from=build /app/dist/* /usr/share/nginx/html/
ADD ./.nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
