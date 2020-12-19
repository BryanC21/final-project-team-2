FROM node:10-alpine

# root dir
WORKDIR /main 

# ENV PATH /main/node_modules/.bin:$PATH

# copies contents of front end
COPY ./front_end/public /main/public
COPY ./front_end/src /main/src
COPY ./front_end/package-lock.json /main
COPY ./front_end/package.json /main
COPY ./back_end/server/Frontend.js /main/server/Frontend.js

RUN npm install --silent
RUN npm run build --silent

# port we are listening to
EXPOSE 3000

# start index
# CMD ["npm", "start"]
CMD ["node", "server/Frontend.js"]