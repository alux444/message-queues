# Use official lightweight Node.js image
FROM node:23-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy tsconfig and source code
COPY tsconfig.json ./
COPY src ./src

# Set environment variable (optional, can also be set in docker-compose)
ENV NODE_ENV=production

CMD ["npm", "run", "prod"]
