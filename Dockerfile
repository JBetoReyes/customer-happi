FROM node
    RUN mkdir /app
    ADD . /app
    WORKDIR app
    RUN npm install > /dev/null
    CMD ["npm", "run", "dev"]
