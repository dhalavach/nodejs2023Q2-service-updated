FROM node:18-alpine3.17 as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm ci --only=production 

FROM node:18-alpine3.17 as runner
WORKDIR /app
COPY package.json ./
COPY prisma prisma
COPY --from=builder app/dist/ ./dist/
COPY --from=builder app/node_modules/ ./node_modules/
EXPOSE 5000
CMD npx prisma migrate dev && node /app/dist/main.js