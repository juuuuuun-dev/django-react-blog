# docker
```
docker-compose pull
docker-compose build --no-cache
```
Docker start
```
docker-compose up -d
```
http://localhost:8000/
# create superuser
```
docker-compose exec django /bin/bash
python manage.py migrate
python manage.py createsuperuser
...
```

# migration
```
python manage.py migrate
python manage.py collectstatic
```
http://localhost:8000/admin/

