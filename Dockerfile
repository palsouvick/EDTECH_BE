# EDTECH backend — production image (used by Back4App Containers)
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 8080
CMD ["npm", "start"]
