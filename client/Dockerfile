FROM node:21.2.0-alpine

WORKDIR /

COPY package*.json ./

RUN npm install --loglevel=error
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]

