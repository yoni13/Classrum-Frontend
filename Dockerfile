FROM node:18-alpine

# Create app directory

WORKDIR /usr/src/app

COPY src/ /usr/src/app/src
COPY package.json /usr/src/app

RUN npm install

RUN npm install -g serve

RUN npm run build

EXPOSE 3000
ENTRYPOINT [ "serve -s build" ]


