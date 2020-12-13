FROM node:15.4.0-alpine3.10

# root dir
WORKDIR /main 

# copies contents of front end
COPY ./back_end/server /main/server
COPY ./back_end/models /main/models
COPY ./back_end/package-lock.json /main
COPY ./back_end/package.json /main

RUN npm install

# port we are listening to
EXPOSE 8080

# start index
# run node server/ApiServer.js
CMD node server/WebsocketServer.js