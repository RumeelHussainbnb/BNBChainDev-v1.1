FROM node:14
WORKDIR /app
COPY . .
RUN npm --clean install

EXPOSE 3001

CMD [ "npm", "run", "start"]