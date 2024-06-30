# Stage 1
FROM node:22-alpine as build

COPY assets middlewares package.json app.js controller models package-lock.json routes /app/

WORKDIR /app

RUN npm install

# ------------------------------------------------------------------------------------------------

# Stage 2
FROM node:22-alpine as production

COPY --from=build /app /app

WORKDIR /app

EXPOSE 3000/tcp

CMD ["node", "app.js"]