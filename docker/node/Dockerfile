FROM node:16.20.0-alpine3.17

WORKDIR /app

COPY ../../public/front/package.json ./

# COPY ../../public/front/next.config.js ./next.config.js
COPY . .

RUN  npm install

EXPOSE 3000

CMD ["npm", "run", "dev"] 