import os

from apistar.frameworks.wsgi import WSGIApp as App
from apistar.backends import sqlalchemy_backend
from wsgicors import CORS

from project.routes import routes
from project.config.base import config


settings = config.from_object(os.environ.get('SETTINGS_CLASS', 'ProductionConfiguration'))


class CORSApp(App):
    def __call__(self, environ, start_response):
        cors = CORS(super().__call__, headers='*', methods='*', maxage='180', origin='*')
        return cors(environ, start_response)


app = CORSApp(
    routes=routes,
    settings=settings,
    commands=sqlalchemy_backend.commands,
    components=sqlalchemy_backend.components
)


if __name__ == '__main__':
   app.main()
