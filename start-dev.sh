#!/bin/bash

./pocketbase/pocketbase serve --http="localhost:8090" --dir="./pocketbase/pb_data" --hooksDir="./pocketbase/pb_hooks" --migrationsDir="./pocketbase/pb_migrations" &

bun run dev