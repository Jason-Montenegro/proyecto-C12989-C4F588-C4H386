FROM node:26.7.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8082

CMD ["npm", "run", "dev"]
