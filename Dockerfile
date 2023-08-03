FROM node:18-alpine3.17 as builder
ADD . /app
WORKDIR /app
RUN npm install && npm run build

FROM node:18-alpine3.17 as runner
WORKDIR /app
COPY package.json ./
COPY prisma prisma
COPY --from=builder /app/dist dist
EXPOSE 5000
CMD npx prisma migrate dev && npm run start