from apistar import typesystem


class IdType(typesystem.Integer):
    description = 'The unique id of the user'


class PostContentType(typesystem.String):
    min_length = 1
    max_length = 128
    description = 'The post content'


class DateType(typesystem.String):
    format = 'date'


class TitleType(typesystem.String):
    max_length = 255
    description = 'The post title'


class PostType(typesystem.Object):
    properties = {
        'id': IdType,
        'author_id': IdType,
        'title': TitleType,
        'content': PostContentType,
        'created_at': DateType,
    }
