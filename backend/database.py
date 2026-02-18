import psycopg2
from psycopg2.extras import RealDictCursor

DB_CONFIG = {
    "dbname": "vulner_db",
    "user": "postgres",
    "password": "postgres",
    "host": "localhost",
    "port": 5432
}

def get_connection():
    return psycopg2.connect(**DB_CONFIG)
