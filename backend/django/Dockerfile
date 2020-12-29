FROM python:3.8
ENV PYTHONUNBUFFERED 1
RUN mkdir /app
WORKDIR /app
COPY requirements.txt /app/
ARG OWNER="uwsgi"
RUN pip install --upgrade pip \
  && pip3 config list \
  && pip install -r requirements.txt \
  && echo "alias pm='python manage.py'" >>/root/.bashrc \
  && echo "alias reload='uwsgi --reload /app/config/uwsgi.pid'" >>/root/.bashrc
RUN if [ ${OWNER} != "root" ]; then \
     groupadd ${OWNER} && useradd -r -g ${OWNER} ${OWNER} \
;fi
COPY --chown=${OWNER}:${OWNER} . .
USER ${OWNER}
CMD ["uwsgi", "--ini", "/app/django.ini"]
