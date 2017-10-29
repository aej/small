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


RESPONSE_OBJECT_TEMPLATE = dict(
    status='success'
)


def list_posts_view(session: Session) -> typing.List[PostType]:
    response_object = RESPONSE_OBJECT_TEMPLATE
    # TODO: order by created alt
    queryset = session.query(Post).all()

    response_object['data'] = {}
    response_object['data']['posts'] = [PostType(record) for record in queryset]

    return Response(response_object, status=200)


def detail_post_view(session: Session, post_id: IdType) -> Response:
    response_object = RESPONSE_OBJECT_TEMPLATE
    post = session.query(Post).get(post_id)

    if not post:
        response_object['status'] = 'fail'
        response_object['message'] = 'Post does not exist'
        status_code = 204
    else:
        response_object['data']  = dict(
            id=post.id,
            author_id=post.author_id,
            title=post.title,
            content=post.content,
            created_at=post.created_at
        )
        status_code = 200
    return Response(response_object, status=status_code)


def create_post_view(session: Session, settings: Settings, post: PostType) -> Response:
    response_object = RESPONSE_OBJECT_TEMPLATE

    author_id = post.author_id
    title = post.title
    content = post.content

    try:
        post = Post(author_id=author_id, title=title, content=content)
        session.add(post)
        session.flush()

        response_object['message'] = 'New post created'
        return Response(response_object, status=201)

    except (exc.IntegrityError, ValueError) as e:
        response_object['status'] = 'error'
        response_object['message'] = 'Invalid payload'

        return Response(response_object, 400)
