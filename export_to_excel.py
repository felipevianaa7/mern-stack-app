import psycopg2
import pandas as pd

# Configurações do banco
DB_CONFIG = {
    "host": "localhost",
    "database": "mern_db",
    "user": "felipe",
    "password": "3espadas",
    "port": "5432"  # Porta padrão do PostgreSQL
}

def main():
    try:
        # 1. Conectar e buscar dados
        conn = psycopg2.connect(**DB_CONFIG)
        df = pd.read_sql("SELECT * FROM users;", conn)
        
        # 2. Exportar para Excel
        df.to_excel("usuarios.xlsx", index=False)
        print("Exportação concluída!")
        
    except Exception as e:
        print(f"Erro: {e}")
    finally:
        if 'conn' in locals():
            conn.close()

if __name__ == "__main__":
    main()