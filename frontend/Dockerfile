FROM node:alpine

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/package.json

RUN npm install --force

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]