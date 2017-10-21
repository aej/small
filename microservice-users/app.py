import os

from apistar.frameworks.wsgi import WSGIApp as App
from apistar.backends import sqlalchemy_backend

from project.routes import routes
from project.config.base import config


settings = config.from_object(os.environ.get('SETTINGS_CLASS', 'ProductionConfiguration'))


app = App(
    routes=routes,
    settings=settings,
    commands=sqlalchemy_backend.commands,
    components=sqlalchemy_backend.components
)


if __name__ == '__main__':
   app.main()
