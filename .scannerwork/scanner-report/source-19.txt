# Stage 1: Build Node.js app
FROM node:latest as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .



# Rebuild bcrypt module
RUN npm rebuild bcrypt --build-from-source

# Stage 2: Final image with only Node.js runtime
FROM node:latest as final

WORKDIR /usr/src/app

COPY --from=node /usr/src/app .

# Expose port 3000 for Node.js application
EXPOSE 3000



# Start the Node.js application
CMD ["node", "app.js"]