# Проектная работа Stellar Burgers

«Stellar Burgers» — самая настоящая космическая бургерная. Где-то на краю Вселенной любая форма жизни может заказать тот бургер, который она хочет… Конечно, с помощью приложения.

### Использованные технологии
 - Webpack
 - TypeScript
 - React
 - React Router
 - Redux Toolkit
 - Jest
 - Cypress

# Запуск

## GitHub Pages

[Ссылка](https://r3dkar.github.io/stellar-burgers/)

## Вручную
Скачать проект, создать `.env` (пример данных в `.env.example`), выполнить:

```bash
npm ci
npm start
```
Сайт будет доступент на http://localhost:4000

# Запуск тестов

## Unit тесты (Jest)

```bash
npm test
```

## Интеграционные тесты (Cypress)

Параллельно необходимо запустить сайт через `npm start`

Headless запуск:

```bash
npm run cy:test
```

С GUI:

```bash
npm run cy:open
```
