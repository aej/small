from apistar import typesystem


class IdType(typesystem.Integer):
    description = 'The unique id of the user'


class UsernameType(typesystem.String):
    min_length = 1
    max_length = 128
    description = 'The username of the user'


class EmailType(typesystem.String):
    min_length = 1
    max_length = 128
    pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$' # regex string to catch most email addresses.
    description = 'The email of the user'


class UserType(typesystem.Object):
    properties = {
        'id': IdType,
        'username': UsernameType,
        'email': EmailType
    }