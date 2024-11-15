# TODO: dodać ENV na ścieszkę pocketbase

FROM oven/bun:latest as build

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

RUN bun run build-only

RUN chmod +x /app/pocketbase/pocketbase

RUN mkdir -p pb_data

EXPOSE 8090

CMD ["/app/pocketbase/pocketbase", "serve", "--http", "0.0.0.0:8090", "--dir", "pb_data", "--migrationsDir", "/app/pocketbase/pb_migrations", "--publicDir", "/app/dist"]
# # Nginx stage
# FROM nginx:alpine

# COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]


