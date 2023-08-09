FROM node:18-alpine3.17 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

FROM node:18-alpine3.17 as runner
COPY package*.json /app/
COPY tsconfig*.json /app/
COPY nest-cli.json /app/
COPY doc /app/doc/
COPY prisma /app/prisma/
COPY src /app/src/
COPY --from=builder /app/node_modules/ /app/node_modules/
EXPOSE 5000
WORKDIR /app
CMD npx prisma migrate dev && npm run start:dev