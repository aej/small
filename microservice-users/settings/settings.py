class ProductionConfiguration:
    """Production configuration runs as default."""
    DEBUG = False
    TESTING = False


class LocalConfiguration(ProductionConfiguration):
   DEBUG = True


class TestingConfiguration(ProductionConfiguration):
    TESTING = True
