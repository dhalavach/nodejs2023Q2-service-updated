FROM node:18-alpine3.17 as builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY src src
RUN npm ci && npm run build



FROM node:18-alpine3.17 as runner

COPY package*.json ./
COPY doc doc
COPY prisma prisma
COPY --from=builder /app/dist/ dist/
RUN npm install
EXPOSE 5000
CMD npx prisma migrate dev && node dist/main