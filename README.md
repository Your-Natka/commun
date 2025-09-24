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
