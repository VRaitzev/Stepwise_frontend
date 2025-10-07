# Stepwise Frontend - React Development

[![React](https://img.shields.io/badge/React-18.2+-61dafb)](https://reactjs.org)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-1.9+-764abc)](https://redux-toolkit.js.org)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3+-7952b3)](https://getbootstrap.com)
[![React Router](https://img.shields.io/badge/React_Router-6.8+-ca4245)](https://reactrouter.com)

**Современный React frontend для платформы саморазвития Stepwise** — производительный интерфейс с управлением состоянием через Redux Toolkit и адаптивным дизайном на Bootstrap 5.

---

## Быстрый старт

### Установка и запуск

    # Клонирование репозитория
    git clone https://github.com/yourusername/stepwise-frontend.git
    cd stepwise-frontend

    # Установка зависимостей
    npm install

    # Запуск development-сервера
    npm start

Приложение будет доступно по адресу: http://localhost:3000

### Сборка для production

    # Создание production-сборки
    npm run build

    # Предпросмотр production-сборки
    npm run preview

---

## Архитектура проекта

project-root/
├── public/ # Публичные ресурсы (favicon, index.html и т.д.)
├── src/ # Исходный код приложения
│ ├── assets/ # Изображения и статические файлы
│ ├── components/ # Переиспользуемые UI-компоненты
│ ├── css/ # Глобальные и модульные стили
│ ├── pages/ # Основные страницы приложения
│ ├── redux/RTK Query API # Управление состоянием и API-слои (RTK Query)
│ ├── App.js # Главный компонент приложения
│ ├── index.js # Точка входа в приложение
│ └── setupTests.js # Конфигурация тестов
├── Dockerfile # Конфигурация контейнера
├── README.md # Документация проекта
├── package.json # Список зависимостей и npm-скрипты
└── .gitignore # Исключения Git

---

## Технологический стек

**Core:**
- React 18 — функциональные компоненты и хуки  
- Redux Toolkit — управление состоянием  
- RTK Query — асинхронные запросы и кэширование  
- React Router v6 — маршрутизация

**UI & Styling:**
- Bootstrap 5 — сетка и компоненты  
- Bootstrap Icons — иконки  
- Custom CSS — брендированные стили  
- Responsive Design — адаптивная верстка

**Development:**
- JavaScript ES6+  
- CSS Variables  
- Local Storage — сохранение сессий  

---

## Основные компоненты

**Intro (лендинг-страница):**
- Анимации и плавная навигация  
- Адаптивная сетка преимуществ  
- Кастомные стили и типографика  

**Auth System (RegistrationPage, SignIn):**
- Валидация форм в реальном времени  
- JWT-аутентификация  
- Toggle видимости пароля  
- Редирект после входа  

**InteractionWindow (главный дашборд):**
- Трекер прогресса (физический + ментальный)  
- Рекомендации по питанию и тренировкам  
- CRUD операций с кастомными задачами  
- Real-time обновления через RTK Query  

**MentalPlan (планировщик обучения):**
- Управление книгами, видео, курсами  
- Уникальные ID (uuidv4)  
- Валидация и карточки с состоянием редактирования  

**PhysicalPlan (фитнес-профиль):**
- Слайдеры и калькуляция ИМТ  
- Формулы целей (похудение, набор, поддержание)  
- Onboarding-процесс  

---

## Интеграция с API

**RTK Query endpoints:**

    const { data, isLoading } = useGetUsersPhysicalPlanQuery({ id, token });
    const [updatePhysicalPlan] = useUpdatePhysicalPlanMutation();

**Основные API-модули:**
- usersAPI — аутентификация и пользователи  
- physicalPlansAPI — фитнес-данные  
- mentalPlanAPI — образовательные ресурсы  
- resourceAPI — управление книгами, видео, курсами  
- otherTasksAPI — кастомные задачи  

---

**Адаптивность:**
- Mobile-first подход  
- Bootstrap grid  
- Touch-friendly интерфейс  

---

## Development Scripts

    {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject"
    }

---

## Зависимости

**Основные:**

    {
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-router-dom": "^6.8.0",
      "@reduxjs/toolkit": "^1.9.0",
      "react-redux": "^8.0.0",
      "bootstrap": "^5.3.0",
      "bootstrap-icons": "^1.10.0"
    }

**Dev-зависимости:**

    {
      "react-scripts": "5.0.1"
    }

---

## Производительность

- Code Splitting (React.lazy)  
- Мемоизация компонентов  
- Эффективные повторные рендеры  
- Кэширование через RTK Query  

---

## Планы по развитию

- Миграция на TypeScript  
- Поддержка PWA  
- Тёмная/светлая темы  
- Интернационализация (i18n)  
- Анимации (Framer Motion)  

---

**Stepwise Frontend** — современный React-интерфейс для саморазвития.


