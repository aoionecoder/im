FROM nginx:1.15
MAINTAINER aoi <aoionecoder@gmail.com>

FROM node:8.6.0-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# add npm package
COPY package.json /usr/src/app/package.json
RUN npm i --production
# copy code
COPY . /usr/src/app
EXPOSE 80
CMD npm start
