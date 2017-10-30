from apistar import Include, Route
from apistar.handlers import docs_urls, static_urls

from .views import list_posts_view, create_post_view, detail_post_view, delete_post_view

routes = [

    Route('/posts', 'GET', list_posts_view),
    Route('/posts', 'POST', create_post_view),
    Route('/posts/{post_id}', 'GET', detail_post_view),
    Route('/posts/{post_id}', 'DELETE', delete_post_view),

    Include('/posts_docs', docs_urls),
    Include('/posts_static', static_urls)
]
