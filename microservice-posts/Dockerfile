FROM python:3.6.2

RUN pip install pipenv --upgrade

COPY Pipfile Pipfile
COPY Pipfile.lock Pipfile.lock

RUN pipenv install --deploy --system

RUN mkdir /app
COPY . /app
WORKDIR /app

EXPOSE 8080

CMD [ "pipenv", "run", "apistar", "run", "--host", "0.0.0.0", "--port", "8070" ]