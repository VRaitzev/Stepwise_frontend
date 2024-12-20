# Используем официальный Node.js образ
FROM node:18

# Рабочая директория
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock, если используется Yarn)
COPY package.json package-lock.json /app/

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . /app/

# Строим фронтенд
RUN npm run build

# Устанавливаем глобально пакет serve для раздачи статики
RUN npm install -g serve

# Запускаем сервер для отдачи статики
CMD ["serve", "-s", "build", "-l", "3000"]
