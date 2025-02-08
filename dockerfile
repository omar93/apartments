# Step 1: Build the SvelteKit app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy frontend package files
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend files
COPY frontend/ ./

# Build the SvelteKit app
RUN npm run build

# Step 2: Create the final container with Express backend
FROM node:18-alpine

WORKDIR /app

# Copy backend package files first
COPY package*.json ./
RUN npm install --omit=dev

# Copy the Express backend code
# But exclude the frontend directory to keep the image clean
COPY *.js ./
COPY public ./public

# Copy the built SvelteKit static files into the public folder
COPY --from=builder /app/build ./public

EXPOSE 3000

CMD ["node", "server.js"]