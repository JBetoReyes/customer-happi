FROM node
    RUN mkdir /app
    ADD . /app
    WORKDIR app
    RUN npm install > /dev/null
    EXPOSE 1337
    CMD ["npm", "run", "dev"]
