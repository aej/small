import logging
import typing

from apistar import Response
from apistar.backends.sqlalchemy_backend import Session
from apistar.types import Settings
from sqlalchemy import exc

from .types import PostType, IdType
from .models import Post


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def list_posts_view(session: Session) -> typing.List[PostType]:
    # TODO: order by created at
    queryset = session.query(Post).all()
    posts = [PostType(record) for record in queryset]
    return Response({'data': posts}, status=200)


def detail_post_view(session: Session, post_id: IdType) -> typing.List[PostType]:
    post = session.query(Post).get(post_id)

    if not post:
        return Response({'message': 'Post does not exist'}, status=204)
    else:
        post_data  = dict(
            id=post.id,
            author_id=post.author_id,
            title=post.title,
            content=post.content,
            created_at=post.created_at
        )
        return Response({'data': post_data}, status=200)


def create_post_view(session: Session, settings: Settings, post: PostType) -> Response:
    author_id = post.get('author_id')
    title = post.get('title')
    content = post.get('content')

    try:
        post = Post(author_id=author_id, title=title, content=content)
        session.add(post)
        session.flush()

        return Response({'message': 'Post created.'}, status=201)

    except (exc.IntegrityError, ValueError):
        return Response({'message': 'Invalid payload'}, 400)
