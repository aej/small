import os

from project.models import Base


class BaseConfiguration:
    DATABASE = {
        'URL': os.environ.get('DATABASE_URL'),
        'METADATA': Base.metadata
    }


class ProductionConfiguration(BaseConfiguration):
    """Production configuration runs as default."""



class LocalConfiguration(BaseConfiguration):
    DEBUG = True
