FROM python:3.8
ENV PYTHONUNBUFFERED 1
RUN mkdir /app
WORKDIR /app
COPY requirements.txt /app/
RUN pip install --upgrade pip \
  && pip3 config list \
  && pip install -r requirements.txt \
  && echo "alias pm='python manage.py'" >>/root/.bashrc \
  && echo "alias reload='uwsgi --reload /app/config/uwsgi.pid'" >>/root/.bashrc
COPY . /app/
CMD uwsgi --socket :8001 --py-autoreload 1 --ini /app/django.ini
