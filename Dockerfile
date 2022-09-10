FROM node:current-alpine
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps --silent
COPY . .
RUN npm run build
CMD npm run preview
