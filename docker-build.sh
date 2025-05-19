#!/bin/bash

# a) Zalogowanie do docker registry z użyciem credentials z pliku
source .docker-build-env
echo "Logowanie do rejestru Docker na gitea.garandplg.com..."
docker login gitea.garandplg.com -u $GITEA_USERNAME -p $GITEA_ACCESS_TOKEN

# b) Wyciąganie wersji z pliku dockerfile
VERSION=$(grep 'LABEL version=' dockerfile | sed 's/LABEL version="\(.*\)"/\1/')
echo "Znaleziona wersja: $VERSION"

# c) Budowanie obrazu
IMAGE_NAME="gitea.garandplg.com/garands-world-game/garands-world-game:$VERSION"
echo "Budowanie obrazu $IMAGE_NAME..."
docker build -t $IMAGE_NAME .

# d) Tagowanie obrazu jako latest
LATEST_IMAGE="gitea.garandplg.com/garands-world-game/garands-world-game:latest"
echo "Tagowanie obrazu jako latest..."
docker tag $IMAGE_NAME $LATEST_IMAGE

# e) Pushowanie obu obrazów
echo "Pushowanie obrazu z tagiem wersji..."
docker push $IMAGE_NAME
echo "Pushowanie obrazu z tagiem latest..."
docker push $LATEST_IMAGE

echo "Zakończono pomyślnie!"