from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv, dotenv_values

connection_string = dotenv_values(".env")['SQLALCHEMY_DATABASE_URL']

engine = create_engine(connection_string,connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()