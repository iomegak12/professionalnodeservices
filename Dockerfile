FROM mhart/alpine-node:latest

COPY . /app

WORKDIR /app

EXPOSE 9090

CMD ["node ./publish/index.js"]
