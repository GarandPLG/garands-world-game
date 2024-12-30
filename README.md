# Garand's WG

<!-- TODO: Ogarnąć fajne logo-->

![Logo](ścieżka/do/logo.png)

## 🌍 Opis

Garand's WG to nowoczesna aplikacja webowa stworzona z myślą o graczach, którzy chcą zarządzać
krajami w grach typu World Game. Dzięki niej możesz zakładać konto, wypełniać raporty, przeglądać
statystyki i mapy – wszystko w jednym miejscu.

## 🎯 Cel i założenia

Celem aplikacji jest ułatwienie zarządzania krajami w grach strategicznych. Dzięki Garand's WG
możesz skupić się na najważniejszych aspektach rozgrywki, takich jak role play, prowadzenie wojen
czy dyplomacja.

## ✨ Funkcjonalności

- Tworzenie kont użytkowników.
- Wysyłanie raportów dla zarządzanych krajów.
- Wyświetlanie przejrzystych wykresów i statystyk.
- Interaktywna mapa świata gry.
- Panele administracyjne dla zaawansowanego zarządzania.

## 🛠️ Użyte technologie

Projekt wykorzystuje nowoczesny stack technologiczny:

- **Bun** – runtime JavaScriptu.
- **Vue.js** – framework frontendu.
- **TailwindCSS** – narzędzie do stylizacji.
- **Vite** – szybszy bundler.
- **PocketBase** – backend do zarządzania danymi.
- **Redis** – szybka pamięć podręczna i magazyn klucz-wartość.
- **Schadcn-vue** – zestaw komponentów UI.
- **TypeScript** – typowanie dla lepszej czytelności kodu.

## 🚀 Instalacja i uruchomienie

1. Zainstaluj **Bun** jako runtime JavaScriptu.
2. Zainstaluj wymagane moduły za pomocą `bun install`.
3. Uruchom Redis:
   - Przejdź do folderu `redis`: `cd redis`.
   - Zbuduj obraz API na podstawie Dockerfile: `docker build . -t dpr.garandplg.com/garandplg/gwg-redis-api:latest`.
   - Uruchom Redis za pomocą Docker Compose: `docker-compose up -d`.
4. Uruchom projekt:
   - Jeśli korzystasz z **nix** lub **nixOS**, uruchom projekt za pomocą `nix-shell`.
   - W przypadku systemu **bash**, skorzystaj ze skryptu `./start-dev.sh`.
   - Jeśli napotkasz problemy, pobierz plik **PocketBase**, umieść go w folderze `/pocketbase` i
     uruchom ręcznie dwa procesy:
     - Serwer PocketBase z odpowiednimi ustawieniami.
     - Serwer developerski z **bun**.

## 📖 Użycie

Po poprawnym uruchomieniu aplikacja będzie dostępna pod adresem:  
`http://localhost:5173`

Dostęp do panelu administratora w wersji developerskiej:  
`http://localhost:5173/pb/_/`  
W wersji produkcyjnej:  
`http://localhost:5173/_/`

## 📋 Wymagania

- **Bun** w wersji co najmniej `1.1.42`.
- **PocketBase** w wersji co najmniej `0.22.26`.
- **Docker** i **Docker Compose** w najnowszej stabilnej wersji.

## ⚖️ Licencja

Projekt jest udostępniony na licencji **MIT** – możesz korzystać z niego dowolnie, zgodnie z
warunkami licencji.

## 📬 Kontakt

Masz pytania lub pomysły? Skontaktuj się ze mną:  
✉️ [garandplg@gmail.com](mailto:garandplg@gmail.com)

## 🤝 Jak się zaangażować?

Jeśli chcesz wesprzeć projekt, możesz:

- Zgłaszać błędy na stronie
  [issues](https://gitea.garandplg.com/GarandPLG/garands-world-game/issues).
- Wysyłać swoje zmiany poprzez
  [pull requests](https://gitea.garandplg.com/GarandPLG/garands-world-game/pulls).
- Dołączyć do naszej społeczności na Discordzie i podzielić się swoimi uwagami:
  [Discord](https://discord.gg/vhBmFVpR3w).

Dziękuję za zainteresowanie projektem! 😊
