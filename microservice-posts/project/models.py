from datetime import datetime

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Text

Base = declarative_base()


class Post(Base):

    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True, autoincrement=True)
    author_id = Column(Integer, nullable=False, unique=False)
    title = Column(String(255), nullable=False, unique=False)
    content = Column(Text, nullable=False, unique=False)
    created_at = Column(DateTime, nullable=False)

    def __init__(self, author_id, title, content):
        self.author_id = author_id
        self.title = title
        self.content = content
        self.created_at = datetime.utcnow()