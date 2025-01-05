# Movie Matcher

## Spis treści

1. [Opis projektu](#opis-projektu)
2. [Struktura projektu](#struktura-projektu)
3. [Instalacja](#instalacja)
4. [Technologie](#technologie)
5. [Komponenty i funkcjonalności](#komponenty-i-funkcjonalności)

## Opis projektu

Movie Matcher to aplikacja typu Tinder dla filmów, umożliwiająca użytkownikom przeglądanie i ocenianie filmów poprzez intuicyjny interfejs z kartami. Użytkownicy mogą przeciągać karty w prawo (polubienie) lub w lewo (odrzucenie).

## Struktura projektu

src/ ├── app/ # Komponenty stron i routing ├── components/ # Komponenty wielokrotnego użytku │ ├── Footer/ # Stopka aplikacji │ ├── Header/ # Nagłówek aplikacji │ ├── Icons/ # Komponenty ikon │ ├── Main/ # Główny kontener │ └── Movies/ # Komponenty związane z filmami ├── controllers/ # Logika biznesowa │ └── movies/ # Kontrolery filmów ├── styles/ # Style globalne └── types/ # Typy TypeScript

## Technologie

- Next.js 14
- TypeScript
- SCSS Modules
- Jest
- PostCSS
- Framer Motion

## Komponenty i funkcjonalności

### Główne komponenty:

- **Layout** - Podstawowy układ strony z nagłówkiem i stopką
- **Movies** - System wyświetlania i oceniania filmów

### Kluczowe funkcjonalności:

- Przeglądanie filmów w formie kart
- System oceniania (like/dislike)
- Responsywny design
- Animacje przejść
- Automatyczne ładowanie kolejnych filmów
