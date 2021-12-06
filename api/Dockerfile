FROM node:15.0.1-alpine3.10

WORKDIR /urs/app/api

COPY package*.json ./

RUN npm i

COPY ./ ./

CMD ["npm", "start"]