FROM nginx:1.19
RUN rm /etc/nginx/conf.d/default.conf
COPY ./templates/ /etc/nginx/templates
COPY ./uwsgi_params etc/nginx/uwsgi_params
# COPY ./backend/django/static/ /static
