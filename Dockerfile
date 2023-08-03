FROM node:18-alpine3.17
WORKDIR /app
COPY package*.json ./
COPY prisma prisma
COPY dist dist
RUN npm ci --omit=dev
EXPOSE 5000
CMD npx prisma migrate dev && node /app/dist/main.js