from apistar import Include, Route
from apistar.handlers import docs_urls, static_urls

from .views import list_users_view, create_user_view, detail_user_view

routes = [

    Route('/users', 'GET', list_users_view),
    Route('/users', 'POST', create_user_view),
    Route('/users/{user_id}', 'GET', detail_user_view),

    Include('/docs', docs_urls),
    Include('/static', static_urls)
]
