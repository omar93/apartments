# Step 1: Build the SvelteKit app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy frontend package files
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend files
COPY frontend/ ./

# Build the SvelteKit app
RUN npm run build
RUN ls -la  # This will show us where the files are being generated

# Step 2: Create the final container with Express backend
FROM node:20-alpine

WORKDIR /app

# Copy backend package files first
COPY package*.json ./
RUN npm install --omit=dev

# Copy the Express backend code
COPY *.js ./

# Copy the built files from the builder stage
COPY --from=builder ../public ./public

EXPOSE 3000

CMD ["node", "server.js"]