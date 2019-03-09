FROM node
    RUN mkdir /app
    WORKDIR app
    RUN npm install > /dev/null
    CMD ["npm", "run", "dev"]
