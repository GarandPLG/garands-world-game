FROM oven/bun:latest AS build

WORKDIR /build

COPY package.json bun.lockb ./

RUN bun install  # --frozen-lockfile

COPY . .

RUN bun run build-only \
  && bun pm cache rm \
  && rm -rf /root/.bun \
  && rm -rf node_modules

FROM alpine:latest

LABEL maintainer="garandplg@garandplg.com"
LABEL version="0.0.39"
LABEL description="Garand's WG. Pocketbase + Redis + Bun + Vue3 + Vite + TypeScript + TailwindCSS + Shadcn-vue"

ARG PB_VERSION=0.28.1

RUN apk add --no-cache \
  unzip \
  ca-certificates

WORKDIR /app

COPY --from=build /build/dist ./pb_public
COPY --from=build /build/pocketbase/pb_migrations ./pb_migrations
COPY --from=build /build/pocketbase/pb_hooks ./pb_hooks

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip

RUN unzip /tmp/pb.zip -d ./ \
  && rm -rf \ 
  ./CHANGELOG.md \
  ./LICENSE.md \
  /tmp/pb.zip \
  /build \
  && mkdir -p pb_data \
  && chmod +x ./pocketbase \
  && adduser -D pocketbase \
  && chown -R pocketbase:pocketbase /app

USER pocketbase

EXPOSE 8090

CMD ["./pocketbase", "serve", "--http", "0.0.0.0:8090", "--dir", "./pb_data", "--migrationsDir", "./pb_migrations", "--publicDir", "./pb_public", "--hooksDir", "./pb_hooks"]
