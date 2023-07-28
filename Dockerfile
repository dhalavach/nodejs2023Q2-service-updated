FROM node

WORKDIR /app

COPY package.json /app

RUN npm install --force

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "start:dev" ]