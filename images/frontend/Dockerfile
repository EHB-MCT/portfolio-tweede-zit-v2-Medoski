FROM node:latest

# Create a new directory for the app
RUN mkdir -p /usr/src/app


# Copy the package.json and package-lock.json files
COPY package*.json ./


WORKDIR /usr/src
# Install the dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the app
RUN npm run build

# Expose the app's port
EXPOSE 5173

VOLUME /usr/src

# Start the app
CMD ["npm", "run" , "dev"]