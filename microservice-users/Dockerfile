FROM python:3.6.2

# -- Install Pipenv:
RUN pip install pipenv --upgrade

COPY Pipfile Pipfile
COPY Pipfile.lock Pipfile.lock

RUN pipenv install --deploy --system

RUN mkdir /app
COPY . /app
WORKDIR /app


CMD [ "pipenv", "run", "apistar", "run" ]