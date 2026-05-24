FROM node:20-alpine

WORKDIR /app

# Install build tools needed for native dependencies (like bcrypt/pg)
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json* yarn.lock* ./

# Install dependencies
RUN npm install

COPY . .

# Build the Medusa project (without admin to save RAM in production)
RUN NODE_ENV=production npm run build

# Start command handles migrations and then starts the server
CMD ["npm", "run", "start"]
