FROM python:3

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT=8000 WEBSITE_PORT=8000

EXPOSE 8000

CMD ["python", "run.py"]