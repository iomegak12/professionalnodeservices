FROM mhart/alpine-node:latest

COPY . /app

WORKDIR /app

EXPOSE 9090

ENTRYPOINT ["node publish/index.js"]
