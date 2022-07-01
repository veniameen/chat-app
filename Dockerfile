FROM --platform=linux/amd64 node:18.0.0
WORKDIR /app

COPY . .
# COPY package*.json ./

RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "node", "server.js" ]