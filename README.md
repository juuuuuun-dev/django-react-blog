# docker
```
docker-compose pull
docker-compose build --no-cache
docker volume create --name=sync-blog-backend
docker volume create --name=sync-blog-frontend
```
起動
```
docker-sync-stack start
or
docker-compose -f ./docker-compose.yml -f ./docker-compose-dev.yml up -d
```
http://localhost:8000/
# create superuser
```
docker-compose exec django /bin/bash
python manage.py createsuperuser
...
```

# migration
```
python manage.py migrate
python manage.py collectstatic
```
http://localhost:8000/admin/

