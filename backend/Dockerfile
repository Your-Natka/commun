FROM python:3.11-slim

WORKDIR /app

# system deps needed for some wheels (psycopg2-binary usually ok; we use psycopg2-binary)
RUN apt-get update && apt-get install -y build-essential libpq-dev --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
RUN pip install --upgrade pip
RUN pip install bcrypt passlib
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]