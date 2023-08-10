FROM node:16.20.0-alpine3.17

WORKDIR /app

COPY ../../public/front/package.json ../../public/front/yarn.lock ./

COPY ../../public/front/next.config.js ./next.config.js

RUN  npm install --production

CMD ["yarn", "dev"]