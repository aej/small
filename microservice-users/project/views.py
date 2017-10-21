import json
import typing
import logging

from apistar import Response
from apistar.backends.sqlalchemy_backend import Session

from .models import User
from .types import UserType, EmailType, UsernameType, IdType

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


response_object = dict(
    status='success'
)

def list_users_view(session: Session) -> typing.List[UserType]:
    """List all the users on in the database."""
    queryset = session.query(User).all()
    response_object['data'] = [UserType(record) for record in queryset]

    return Response(response_object, status=200)


def create_user_view(session: Session, user: UserType) -> Response:
    """Create a new user with a given username and password."""
    username = user.get('username')
    email = user.get('email')

    user = User(username=username, email=email)
    session.add(user)
    session.flush()

    response_object['data'] = dict(
        id=user.id,
        username=user.username,
        email=user.email
    )

    return Response(response_object, status=201)


def detail_user_view(session: Session, user_id: IdType) -> Response:
    """Get details about a single user."""
    user = session.query(User).get(user_id)
    if user:
        response_object['data'] = dict(
            id=user.id,
            username=user.username,
            email=user.email
        )
        return Response(response_object, status=200)
    else:
        response_object['status'] = 'fail'
        response_object['message'] = 'User does not exist'
        return Response(response_object, status=204)
