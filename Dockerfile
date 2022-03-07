FROM node:15.0.1 AS builder
WORKDIR /app

COPY package.json .
RUN yarn install
COPY . .
CMD ["yarn", "start"]
