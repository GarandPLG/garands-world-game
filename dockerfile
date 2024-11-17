# TODO: dodać ENV na ścieszkę pocketbase

FROM oven/bun:latest as build

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .
RUN bun run build-only

FROM alpine:latest

LABEL maintainer="garandplg@garandplg.com"
LABEL version="0.0.15"
LABEL description="Garand's WG. Pocketbase + Bun + Vue3 + Vite + TypeScript + TailwindCSS + Shadcn-vue"

WORKDIR /pb
COPY --from=build /app/dist ./pb_public
COPY --from=build /app/pocketbase/pocketbase ./
COPY --from=build /app/pocketbase/pb_migrations ./pb_migrations

RUN mkdir -p pb_data
RUN chmod +x ./pocketbase

RUN adduser -D pocketbase
RUN chown -R pocketbase:pocketbase /pb

EXPOSE 8090

CMD ["./pocketbase", "serve", "--http", "0.0.0.0:8090", "--dir", "./pb_data", "--migrationsDir", "./pb_migrations", "--publicDir", "./pb_public"]

# # Nginx stage
# FROM nginx:alpine

# COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]


