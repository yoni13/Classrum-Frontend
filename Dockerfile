FROM node:18-alpine

RUN npm install

RUN npm install -g serve

RUN npm run build

EXPOSE 3000
ENTRYPOINT [ "serve -s build" ]


