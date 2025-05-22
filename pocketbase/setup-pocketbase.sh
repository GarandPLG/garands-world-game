#!/bin/bash

PB_VERSION="0.28.1"

while getopts "v:" opt; do
  case $opt in
    v)
      PB_VERSION="$OPTARG"
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done

if [ ! -f ./pocketbase ]; then
  curl -L "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip" -o ./pb.zip

  unzip ./pb.zip -d .

  rm -rf ./CHANGELOG.md ./LICENSE.md ./pb.zip

  chmod +x ./pocketbase

  echo -e "Downloaded PocketBase version ${PB_VERSION}"

  if [ ! -d ./pb_data ]; then
    mkdir ./pb_data

    echo -e "Created pb_data folder"
  fi
  
  if [ ! -d ./pb_hooks ]; then
    mkdir ./pb_hooks

    echo -e "Created pb_hooks folder"
  fi
  
  if [ ! -d ./pb_migrations ]; then
    mkdir ./pb_migrations

    echo -e "Created pb_migrations folder"
  fi
fi
