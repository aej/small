Small is a simple blogging application, similar to Medium. It will let users write little blog posts which will all be shared on the main page.

I'm attempting to follow the structure on https://testdriven.io

There will be the following microservices as part of this application:

1. users - manage users and auth
2. client - client-side react app
3. posts - application for managing user posts
4. gateway - a reverse proxy for the apis

# Tools

* APIStar
* React
* Nginx
* Docker


# Environment configuration

This application is production ready. The following environment variables are required for each service.
```bash

############
# FRONTEND #
############
REACT_APP_USERS_SERVICE_BASE_URL=
REACT_APP_POSTS_SERVICE_BASE_URL=

############
# USERS    #
############
JWT_SECRET=jwt_secret
DATABASE_URL=postgres_database_url

############
# POSTS    #
############
DATABASE_URL=
```

In development simply include the following environment variables

```bash
############
# FRONTEND #
############
LOCAL_DEV=True


#################
# POSTS & USERS #
#################
LOCAL_DEV=True
SETTINGS_CLASS=LocalConfiguration

```

# TODO:

- setup a gunicorn run script for the application and redefine the entrypoint
- Add an nginx default 500 page
