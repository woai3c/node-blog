FROM node:lts-alpine
COPY . /usr/neo/node-blog
WORKDIR /usr/neo/node-blog
RUN npm install -g webpack@4.32.2; npm install
CMD npm run build
