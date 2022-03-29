FROM node:16

USER root

RUN \
    mkdir -p /api &&\
    chmod -R 777 /api

WORKDIR /api

COPY . .

RUN \
	npm update &&\
	npm install &&\
	npm cache verify

CMD [ "npm", "run", "development" ]