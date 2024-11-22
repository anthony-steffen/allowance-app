#Version
FROM node:20 

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code
COPY . .

#  Start the app
CMD ["npm", "start"]
