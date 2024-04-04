FROM node:18-alpine as builder

WORKDIR /usr/app
COPY . /usr/app

RUN npm install


RUN npm run build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /usr/app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]


