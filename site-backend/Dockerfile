# 1. Use the official Node.js image
FROM node:18

# 2. Create and set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy package.json and package-lock.json files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of your app's source code
COPY . .

# 6. Expose the port your server listens to
EXPOSE 5000

# 7. Define the command to run your app
CMD [ "node", "server.js" ]