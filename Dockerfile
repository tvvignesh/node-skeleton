ARG app_port
# ARG app_db

FROM node:10.6.0
# ENV NODE_ENV $app_env
# ENV MONGO_HOST $app_db
# ENV NODEJS_IP "0.0.0.0"
RUN mkdir -p /app/server
WORKDIR /app/server
COPY . /app/server
RUN npm install -g typescript nodemon
RUN npm install
RUN npm run-script build
EXPOSE $app_port
#EXPOSE 8085
CMD [ "npm", "start" ]