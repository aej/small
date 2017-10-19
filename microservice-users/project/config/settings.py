import os

from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


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


