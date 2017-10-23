from datetime import datetime

import bcrypt
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean, DateTime

Base = declarative_base()


class User(Base):

    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(128), nullable=False, unique=True)
    email = Column(String(128), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    active = Column(Boolean(), default=False, nullable=False)
    admin = Column(Boolean(), default=False, nullable=False)
    created_at = Column(DateTime, nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.created_at = datetime.utcnow()
        self.password = bcrypt.hashpw(password, bcrypt.gensalt(14)).decode()