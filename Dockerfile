FROM node:18-alpine as builder

WORKDIR /usr/app
COPY . /usr/app

RUN bun install
RUN bun run build

FROM nginx:1.27.3-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /usr/app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]


