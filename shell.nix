{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.curl
    pkgs.unzip
    pkgs.bun
  ];

  shellHook = ''
    if [ ! -f ./pocketbase/pocketbase ]; then
      curl -L https://github.com/pocketbase/pocketbase/releases/download/v0.22.26/pocketbase_0.22.26_linux_amd64.zip -o ./pocketbase/pb.zip
      unzip ./pocketbase/pb.zip -d ./pocketbase
      rm -rf ./pocketbase/CHANGELOG.md ./pocketbase/LICENSE.md ./pocketbase/pb.zip
      chmod +x ./pocketbase/pocketbase
      echo -e "\n##################\nPobrano PocketBase\n##################\n"

      if [ ! -d ./pocketbase/pb_data ]; then
        mkdir ./pocketbase/pb_data
        echo -e "\n##################\nUtworzono folder pb_data\n##################\n"
      fi
      
      if [ ! -d ./pocketbase/pb_hooks ]; then
        mkdir ./pocketbase/pb_hooks
        echo -e "\n##################\nUtworzono folder pb_hooks\n##################\n"
      fi
      
      if [ ! -d ./pocketbase/pb_migrations ]; then
        mkdir ./pocketbase/pb_migrations
        echo -e "\n##################\nUtworzono folder pb_migrations\n##################\n"
      fi
    fi

    ./pocketbase/pocketbase serve --http="localhost:8090" --dir="./pocketbase/pb_data" --hooksDir="./pocketbase/pb_hooks" --migrationsDir="./pocketbase/pb_migrations" &
    bun --bun run dev
  '';
}
