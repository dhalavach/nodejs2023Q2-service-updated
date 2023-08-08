
FROM node:18-alpine3.17
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY doc doc
COPY prisma prisma
RUN npm install --omit=dev
EXPOSE 5000
CMD npx prisma migrate dev && npm run start:dev