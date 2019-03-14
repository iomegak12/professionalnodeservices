FROM mhart/alpine-node:latest

COPY ./node_modules /app

COPY ./publish /app

COPY ./package.json /app

copy ./README.md /app

COPY ./web-content /app

WORKDIR /app

EXPOSE 9090

ENTRYPOINT ["npm start"]
