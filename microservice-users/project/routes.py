from apistar import Include, Route
from apistar.handlers import docs_urls, static_urls

from .views import (list_users_view, create_user_view, detail_user_view,
                    register_user_view, login_user_view, logout_user_view, user_status_view)


routes = [

    Route('/users', 'GET', list_users_view),
    Route('/users', 'POST', create_user_view),
    Route('/users/{user_id}', 'GET', detail_user_view),

    Route('/auth/register', 'POST', register_user_view),
    Route('/auth/login', 'POST', login_user_view),
    Route('/auth/logout', 'GET', logout_user_view),
    Route('/auth/status', 'GET', user_status_view),


    Include('/docs', docs_urls),
    Include('/users_static', static_urls)
]
