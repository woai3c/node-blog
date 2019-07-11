FROM node:lts-alpine
#RUN apk add curl bash
#RUN yum install -y gcc-c++ make sudo
#ENV NVM_DIR /root/.nvm
#RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.13.1/install.sh | bash \
#    && . $NVM_DIR/nvm.sh \
#    && nvm install v10.16.0 \
#    && nvm alias default v10.16.0
COPY . /usr/neo/node-blog
WORKDIR /usr/neo/node-blog
RUN npm install -g webpack@4.32.2; npm install
CMD npm run build