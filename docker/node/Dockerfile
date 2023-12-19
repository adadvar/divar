# FROM node:16.20.0-alpine3.17
FROM node:18-alpine3.19

WORKDIR /app

COPY ../../public/front/package.json ./

COPY ../../public/front/next.config.js ./next.config.js

COPY . .

RUN  npm install

EXPOSE 3000

ENV HOSTNAME "0.0.0.0"

CMD ["npm", "run", "dev"] 