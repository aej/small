import json
import typing
import logging

from apistar import Response
from apistar.backends.sqlalchemy_backend import Session

from .models import User
from .types import UserType, EmailType, UsernameType, IdType

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def list_users_view(session: Session) -> typing.List[UserType]:
    """List all the users and serialize the response."""
    queryset = session.query(User).all()
    return [UserType(record) for record in queryset]


def create_user_view(session: Session, user: UserType) -> Response:

    username = user.get('username')
    email = user.get('email')

    user = User(username=username, email=email)
    session.add(user)
    session.flush()

    data = dict(
        id=user.id,
        username=user.username,
        email=user.email
    )

    return Response(data, status=201)


def detail_user_view(session: Session, user_id: IdType) -> Response:

    user = session.query(User).get(user_id)

    # data = dict(
    #     id=user.pk,
    #     username=user.username,
    #     email=user.email
    # )
    data = str(user_id)
    return Response(data, status=200)
