# commun
1. Створюємо та активуємо віртуальне середовище Python

python3 -m venv .venv
source .venv/bin/activate

2. Встанови залежності:
pip install -r requirements.txt

3. Запусти сервер:

uvicorn app.main:app --reload