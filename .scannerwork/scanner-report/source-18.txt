# Stage 1: Build Node.js app
FROM node:14 AS node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .




RUN npm rebuild bcrypt --build-from-source


FROM node:latest AS final

WORKDIR /usr/src/app

COPY --from=node /usr/src/app .


EXPOSE 3000



# Start the Node.js application
CMD ["node", "app.js"]