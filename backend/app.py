from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app) # Это чтобы сайт мог общаться с сервером

# Создаем базу данных и таблицу
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS candidates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            essay TEXT,
            status TEXT DEFAULT 'Pending'
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    essay = data.get('essay')

    # Сохраняем в SQLite
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO candidates (name, email, essay) VALUES (?, ?, ?)', 
                   (name, email, essay))
    conn.commit()
    conn.close()

    print(f"Новая заявка от: {name}") # Увидишь в терминале
    return jsonify({"message": "Заявка успешно сохранена!"}), 201

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)