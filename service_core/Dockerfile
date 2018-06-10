FROM node:8.11.1-slim

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /service_core
WORKDIR /service_core
ADD . /service_core


RUN npm install -g nodemon --silent

RUN yarn
