FROM oven/bun:1.1.34 AS build

WORKDIR /build

COPY package.json bun.lockb ./
RUN bun install

COPY . .
RUN bun run build-only

FROM alpine:latest

LABEL maintainer="garandplg@garandplg.com"
LABEL version="0.0.20"
LABEL description="Garand's WG. Pocketbase + Bun + Vue3 + Vite + TypeScript + TailwindCSS + Shadcn-vue"

ARG PB_VERSION=0.22.26

RUN apk add --no-cache \
    unzip \
    ca-certificates

WORKDIR /app

COPY --from=build /build/dist ./pb_public
COPY --from=build /build/pocketbase/pb_migrations ./pb_migrations
COPY --from=build /build/pocketbase/pb_hooks ./pb_hooks

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip

RUN unzip /tmp/pb.zip -d ./ \
    && rm -rf ./CHANGELOG.md ./LICENSE.md /tmp/pb.zip \
    && mkdir -p pb_data \
    && chmod +x ./pocketbase \
    && adduser -D pocketbase \
    && chown -R pocketbase:pocketbase /app \
    && rm -rf /build

EXPOSE 8090

CMD ["./pocketbase", "serve", "--http", "0.0.0.0:8090", "--dir", "./pb_data", "--migrationsDir", "./pb_migrations", "--publicDir", "./pb_public", "--hooksDir", "./pb_hooks"]

# TODO: Nginx wewnątrz dockera, żeby serwować pocketbase.
# TODO: Zwiększyć jakiś limit https://pocketbase.io/docs/going-to-production/

# docker run --rm --name wg -p 8888:8090 -v wg_volume:/app/pb_data dpr.garandplg.com/garandplg/garands-world-game:latest
