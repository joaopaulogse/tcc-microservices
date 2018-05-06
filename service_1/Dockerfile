FROM node:8.11.1


ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /service_1
WORKDIR /service_1
ADD . /service_1
RUN yarn install
