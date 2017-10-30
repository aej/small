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
    """List all the posts on the platform."""
    queryset = session.query(Post).order_by(Post.created_at.desc()).all()
    posts = [PostType(record) for record in queryset]
    return {'data': posts}


def detail_post_view(session: Session, post_id: IdType) -> typing.List[PostType]:
    """Get a single post by ID."""
    post = session.query(Post).get(post_id)

    if not post:
        return Response({'message': 'Post does not exist'}, status=204)
    else:
        post_data  = dict(
            id=post.id,
            author_id=post.author_id,
            title=post.title,
            content=post.content,
            created_at=post.created_at.strftime(format='%Y-%m-%d %H:%M'),
        )
        return {'data': post_data}


def create_post_view(session: Session, post: PostType) -> Response:
    """Create a new post"""

    # TODO: Make this view only accessable via JWT authentication and make sure that a user cannot create a post for
    # someone else (check that the ID of the authenticated user is the same as that for the author
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


def delete_post_view(session: Session, post_id: IdType) -> Response:
    """Delete a post"""

    # TODO: make this view only accessible by admin or the author id of the post

    post = session.query(Post).get(post_id)

    if not post:
        return Response({'message': 'Post does not exist'})

    try:
        session.delete(post)
        session.flush()

        return {'message': 'Post deleted.'}

    except (exc.IntegrityError, ValueError):
        return Response({'message': 'Invalid payload'}, 400)
