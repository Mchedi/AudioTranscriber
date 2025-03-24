# Stage 1: Builder with complete debugging
FROM node:18 AS builder
WORKDIR /app

# 1. Copy package files
COPY package*.json ./

# 2. Install dependencies
RUN npm install

# 3. Copy all source files
COPY . .

# 4. Build with exhaustive verification
RUN npm run build && \
    echo "=== DEBUG: Directory Structure ===" && \
    find /app -type d -ls && \
    echo "=== DEBUG: Possible Build Outputs ===" && \
    (test -d /app/build && echo "Found /app/build" || echo "No /app/build") && \
    (test -d /app/dist && echo "Found /app/dist" || echo "No /app/dist") && \
    (test -d /app/.next && echo "Found /app/.next" || echo "No /app/.next") && \
    (test -d /app/out && echo "Found /app/out" || echo "No /app/out") && \
    echo "=== DEBUG: /app Contents ===" && \
    ls -la /app

# Create guaranteed output directory
RUN mkdir -p /app/output && \
    if [ -d "/app/build" ]; then cp -r /app/build/* /app/output; \
    elif [ -d "/app/dist" ]; then cp -r /app/dist/* /app/output; \
    elif [ -d "/app/.next" ]; then cp -r /app/.next/* /app/output; \
    elif [ -d "/app/out" ]; then cp -r /app/out/* /app/output; \
    else echo "ERROR: No build output found!" && exit 1; fi

# Stage 2: Nginx
FROM nginx:alpine
COPY --from=builder /app/output /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]