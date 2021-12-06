FROM node:latest

WORKDIR /urs/app/

COPY package*.json ./

RUN npm i

COPY ./ ./

EXPOSE 3000

CMD ["npm", "start"]