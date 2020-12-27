FROM nginx:1.19
RUN rm /etc/nginx/conf.d/default.conf
#COPY conf/nginx.conf /etc/nginx/conf.d
COPY templates/ /etc/nginx/templates
COPY uwsgi_params etc/nginx/uwsgi_params
#COPY ./django/static /static
