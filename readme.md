Small is a simple blogging application, similar to Medium. It will let users write little blog posts which will all be shared on the main page.

I have followed the structure on https://testdriven.io but have not focussed on the tests and have used APIStart rather than Flask.

This application has the following services:

1. users - manage users and authentication
2. client - client-side React application
3. posts - manager user posts
4. gateway - a proxy to run the applications under the same domain

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

In development, also include the following environment variables

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

# Deployment

To deploy use Docker and your container orchestration technology of choice. Copy the template in docker-compose.yml to set up the containers correctly.
