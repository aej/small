from datetime import datetime

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text

Base = declarative_base()


class Post(Base):

    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True, autoincrement=True)
    author_id = Column(Integer, nullable=False, unique=True)
    title = Column(String(255), nullable=False, unique=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, nullable=False)

    def __init__(self):
        self.created_at = datetime.utcnow()