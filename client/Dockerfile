FROM node:20

WORKDIR /app

COPY . /app

RUN rm -rf node_modules && yarn install --frozen-lockfile

EXPOSE 3000

CMD yarn run dev

