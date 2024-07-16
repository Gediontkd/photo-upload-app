# use the official Node.js image from the Docker Hub
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json into the container
COPY package.json package-lock.json ./

# Install the required Node.js packages
RUN npm install

# Copy the frontend code into the container
COPY . .

# Expose the port that the frontend runs on
EXPOSE 3000

# Command to run the frontend application
CMD ["npm", "start"]

