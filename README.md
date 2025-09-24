# commun
1. Створюємо та активуємо віртуальне середовище Python

2. Встанови залежності:
pip install -r requirements.txt

В корені commun/ виконай:

docker compose up --build

В корені commun/ виконай:

docker compose up --build


Перевір:

Swagger бекенда: http://localhost:8000/docs
 — там має бути POST /auth/register і POST /auth/token.

Фронтенд: http://localhost:3000
 — побачиш сторінку реєстрації (якщо фронтенд слугує nginx; якщо в режимі dev — інший порт).

Якщо ти хочеш запускати фронт в dev (vite) локально: зайди в frontend/ і npm install → npm run dev і відкрий http://localhost:5173
. (У Docker-образі ми збираємо і подаємо статику через nginx, тому в образом порт 3000:80)




3. Запусти сервер:

uvicorn app.main:app --reload

Перевір локально:
npm run dev - працює


працюює
Тепер знову збери Docker:

cd ..
docker compose up --build backend
docker compose down

Тобі треба спочатку запустити всі контейнери:

docker compose up -d


-d запускає їх у фоні (detached mode).

Потім перевір, чи працюють контейнери:
docker compose up -d
docker compose ps


Там має бути commun-db-1, commun-backend-1, commun-frontend-1.

Якщо commun-db-1 не працює, дивимося логи:

docker logs commun-db-1


Після того, як база запущена, можна виконати:

docker exec -it commun-db-1 psql -U postgres -d postgres -c "SELECT * FROM users;"


Тоді точно побачиш, чи користувачі збережені.

1️⃣ Перевірка, що контейнери працюють

В корені проекту виконай:

При запиті токена ми в консолі пишемо 
curl -X POST "http://localhost:8000/api/auth/token" \
>   -H "Content-Type: application/x-www-form-urlencoded" \
>   -d "grant_type=password&username=Ivan&password=678789&scope="
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMCIsImV4cCI6MTc1ODgxNTgwOX0.1QmdkAwiLcunxxZo7XvOKca1w9lhBnVjYBH1MbOE6dM","token_type":

Перевірка токена 
curl -X GET "http://localhost:8000/api/me" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMCIsImV4cCI6MTc1ODgxNTgwOX0.1QmdkAwiLcunxxZo7XvOKca1w9lhBnVjYBH1MbOE6dM"


так виглядають імпорти та залежності між файлами в проекті:
 backend/app/
│
├── main.py
│   ├─ імпортує routers: auth, users, messages, files
│   └─ запускає FastAPI та WebSocket
│
├── auth_utils.py
│   ├─ функції: get_password_hash, verify_password, create_access_token
│   └─ константи: SECRET_KEY, ALGORITHM
│
├── dependencies.py
│   └─ функція get_current_user(token)
│       └─ імпортує: SECRET_KEY, ALGORITHM з auth_utils
│
├── routers/
│   ├── auth.py
│   │   ├─ імпортує: auth_utils (для паролів і токенів)
│   │   └─ використовує dependencies.py тільки якщо потрібен захищений маршрут
│   │
│   ├── users.py
│   │   └─ захищені маршрути: Depends(get_current_user)
│   │
│   ├── messages.py
│   └── files.py
│
└── websocket_manager.py
    └─ управляє активними WebSocket-з’єднаннями

🔑 Як працює взаємодія

Користувач реєструється/логіниться

routers/auth.py використовує auth_utils.py для хешування пароля та створення JWT.

JWT зберігається на фронті

Axios або fetch додає його в заголовки при подальших запитах.

Захищені маршрути

Наприклад, GET /users/me → викликає Depends(get_current_user) з dependencies.py.

get_current_user перевіряє токен через JWT і повертає user_id.

WebSocket

Кожен користувач підключається до /ws/{user_id}.

websocket_manager.py слідкує, хто підключений, і надсилає повідомлення тільки потрібному користувачу.

📂 Структура фронтенду
frontend/src/
│
├── App.tsx                # головний компонент, маршрути
├── main.tsx               # точка входу
├── api/                   # для axios/fetch запитів
│   └── api.ts
│
├── pages/
│   ├── Welcome(Home).tsx  # сторінка привітання, кнопки Login/Register
│   ├── Login.tsx          # форма логіну
│   ├── Register.tsx       # форма реєстрації
│   ├── Chat.tsx           # сторінка чату
│
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── MessageInput.tsx   # поле для вводу повідомлення
│   ├── MessageList.tsx    # відображення повідомлень
│   ├── MessageItem.tsx    # один елемент повідомлення
│   ├── FileUpload.tsx     # компонент для завантаження файлів
│
├── context/
│   └── AuthContext.tsx    # JWT та користувач
│
├── hooks/
│   └── useWebSocket.ts    # WebSocket логіка
│
└── styles/
    └── tailwind.css

 🔹 Пояснення компонентів

Pages

Home.tsx – сторінка-привітання з кнопками Login / Register.

Login.tsx – форма логіну.

Register.tsx – форма реєстрації.

Chat.tsx – сторінка для обміну повідомленнями (один на один).
Використовує MessageList, MessageInput, FileUpload.

Components

Header.tsx – шапка з навігацією і статусом користувача.

Footer.tsx – футер (можна просто copyright).

MessageInput.tsx – поле вводу повідомлення та кнопка "Send".

MessageList.tsx – рендерить масив повідомлень.

MessageItem.tsx – окреме повідомлення з можливістю редагувати та видаляти.

FileUpload.tsx – додає файли до повідомлення.

Context / Hooks

AuthContext.tsx зберігає токен і користувача, дозволяє доступ до них через useContext.

useWebSocket.ts – відкриває WebSocket-з’єднання, слухає повідомлення і відправляє їх.

API

api.ts – Axios інстанс з JWT в заголовку.     