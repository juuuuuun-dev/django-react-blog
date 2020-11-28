FROM python:3.8
ENV PYTHONUNBUFFERED 1
RUN mkdir /app
WORKDIR /app
ADD requirements.txt /app/
RUN pip install --upgrade pip
RUN pip3 config list
RUN pip install -r requirements.txt
ADD . /app/
RUN echo "alias pm='python manage.py'" >>/root/.bashrc
RUN echo "alias reload='uwsgi --reload /app/config/uwsgi.pid'" >>/root/.bashrc
