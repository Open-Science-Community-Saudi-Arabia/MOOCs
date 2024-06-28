FROM node:20

WORKDIR /app

COPY . /app

RUN rm -rf node_modules && npm install

EXPOSE 7000

CMD [ "npm", "run", "dev" ]