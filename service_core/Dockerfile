FROM node:8.11.1

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /service_core
WORKDIR /service_core
ADD . /service_core

RUN npm install -g nodemon
RUN yarn