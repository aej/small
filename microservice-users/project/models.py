from datetime import datetime

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean, DateTime

Base = declarative_base()


class User(Base):

    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False)
    active = Column(Boolean(), default=False, nullable=False)
    created_at = Column(DateTime, nullable=False)

    def __init__(self, username, email):
        self.username = username
        self.email = email
        self.created_at = datetime.utcnow()