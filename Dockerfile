FROM node:8.15
    RUN mkdir /app
    WORKDIR app
    RUN npm install > /dev/null
    CMD [ "npm", "run", "dev"]
