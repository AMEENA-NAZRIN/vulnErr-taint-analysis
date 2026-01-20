import sqlite3
import os
os.makedirs("../database", exist_ok=True)


def get_connection():
    return sqlite3.connect("../database/files.db")


def create_table():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS uploaded_files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT,
        filepath TEXT,
        result TEXT,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_table()
    print("Database and table created successfully.")