FROM node:10.14.2-alpine
WORKDIR /usr/src/api
RUN npm install -g yarn
COPY ["package.json", "yarn.lock*", "./"]
RUN yarn install --production --silent
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
