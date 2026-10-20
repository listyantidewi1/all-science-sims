# ── Stage 1: build ───────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# copy package files dulu biar layer ini di-cache kalau source belum berubah
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: serve ───────────────────────────────────────────
FROM nginx:stable-alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
