FROM node:lts-bullseye-slim as builder
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build


FROM node:lts-bullseye-slim as runner
WORKDIR /app
COPY package.json /app
COPY --from=builder /app/dist /app
EXPOSE 5000
CMD npm run start && npx prisma generate && npx prisma migrate dev
