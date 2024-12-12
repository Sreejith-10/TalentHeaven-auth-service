FROM node:18

WORKDIR /usr/src/app

COPY authentication-service/package*.json ./

RUN npm install

COPY authentication-service/src ./src

EXPOSE 3000

CMD [ "node","src/service.js" ]