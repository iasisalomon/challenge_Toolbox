FROM node:alpine

WORKDIR /usr/src/app

COPY ./frontend/package.json /usr/src/app/package.json

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]