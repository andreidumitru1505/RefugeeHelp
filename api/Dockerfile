FROM node:latest

WORKDIR /usr/src/app/api

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

EXPOSE 8080

CMD ["npm", "run", "dev"]