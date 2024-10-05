#!/bin/bash

curl -L https://github.com/pocketbase/pocketbase/releases/download/v0.22.21/pocketbase_0.22.21_linux_amd64.zip -o ./pocketbase/pb.zip

unzip ./pocketbase/pb.zip -d ./pocketbase

rm -rf ./pocketbase/CHANGELOG.md ./pocketbase/LICENSE.md ./pocketbase/pb.zip

chmod +x ./pocketbase/pocketbase

echo -e "\n\n##################\nPobrano PocketBase\n##################\n\n"
