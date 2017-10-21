import os

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String


Base = declarative_base()


class Customer(Base):
    __tablename__ = 'Customer'
    id = Column(Integer, primary_key=True)
    name = Column(String)



class ProductionConfiguration:
    """Production configuration runs as default."""
    DEBUG = False
    TESTING = False

    DATABASE = {
        'URL': os.environ.get('DATABASE_URL'),
        'METADATA': Base.metadata
    }


class LocalConfiguration(ProductionConfiguration):
   DEBUG = True


class TestingConfiguration(ProductionConfiguration):
    TESTING = True


