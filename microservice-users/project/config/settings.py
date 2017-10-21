import os

from project.models import Base


class ProductionConfiguration:
    """Production configuration runs as default."""

    DATABASE = {
        'URL': os.environ.get('DATABASE_URL'),
        'METADATA': Base.metadata
    }


class LocalConfiguration(ProductionConfiguration):
    pass
