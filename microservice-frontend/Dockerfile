FROM node:slim

# change the npm loglevel to warn
ENV NPM_CONFIG_LOGLEVEL warn

EXPOSE 3000

RUN mkdir -p /app
WORKDIR /app

# copy dependency files and install dependencies
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

# copy all the other files into the container
COPY . /app

RUN chmod +x /app/_tooling/run_server.sh


CMD ["/app/_tooling/run_server.sh"]