#!/bin/bash

docker-compose -f ./dev-server-containers.yaml up -d &

bun run dev
