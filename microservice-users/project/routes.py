from apistar import Include, Route
from apistar.handlers import docs_urls, static_urls

from .views import ping_pong

routes = [
    Route('/', 'GET', ping_pong),
    Include('/docs', docs_urls),
    Include('/static', static_urls)
]
