FROM node:8

WORKDIR /usr/app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./src ./src

RUN ls -lha

# Install
RUN npm install
# Build
RUN npm run build

EXPOSE 3000