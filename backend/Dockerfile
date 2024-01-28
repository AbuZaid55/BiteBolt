FROM node:20

WORKDIR /bitebolt/backend

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 5002

CMD ["npm", "run", "start"]

