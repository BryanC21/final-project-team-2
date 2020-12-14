FROM node:10-alpine

# root dir
WORKDIR /main 

ENV PATH /main/node_modules/.bin:$PATH

# copies contents of front end
COPY ./front_end/public /main/public
COPY ./front_end/src /main/src
COPY ./front_end/package-lock.json /main
COPY ./front_end/package.json /main

RUN npm install

# port we are listening to
EXPOSE 3000

# start index
CMD npm start