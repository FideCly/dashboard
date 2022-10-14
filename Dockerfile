FROM node:lts-alpine

# Create app directory
WORKDIR /webapp

# Install app dependencies
COPY package.json .

RUN npm install --legacy-peer-deps

# Bundle app source
COPY . .

CMD [ "npm", "run", "dev" ]
