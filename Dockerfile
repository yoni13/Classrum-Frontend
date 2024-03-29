FROM node:18-alpine

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install

RUN npm install -g serve

RUN npm run build

EXPOSE 3000
ENTRYPOINT [ "serve -s build" ]


