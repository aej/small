from apistar import Include, Route
from apistar.handlers import docs_urls, static_urls

from .views import list_posts_view, create_posts_view, detail_posts_view

routes = [

    Route('/posts', 'GET', list_posts_view),
    Route('/posts', 'POST', create_posts_view),
    Route('/posts/{post_id}', 'GET', detail_posts_view),

    Include('/docs', docs_urls),
    Include('/users_static', static_urls)
]
