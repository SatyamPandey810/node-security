FROM node:20


WORKDIR /new-apps

COPY package*.json  ./

RUN npm ci

COPY . .

EXPOSE 7000

CMD [ "npm","start" ]