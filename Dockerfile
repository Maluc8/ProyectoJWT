FROM node:18-alpine

WORKDIR /PROYECTOJWT

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]