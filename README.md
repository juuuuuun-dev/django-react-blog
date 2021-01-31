# Docker settings
```
cp backend/django/.env.example backend/django/.env
docker-compose pull
docker-compose build
docker-compose up -d
```

### Django settings
```
docker-compose exec django /bin/bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic
```

### Django admin
http://localhost:8000/admin/

# Frontend settings
```
cd frontend
cp .env.example .env
yarn install
yarn start
```


# Terraform settings
### initialize
```
$ cd terraform/init
$ cp terraform.tfbackend.example terraform.tfbackend
# edit your setting to terraform.tfbackend
$ cp terraform.tfvars.example terraform.tfvars
# edit your setting to terraform.tfvars
$ terraform init -backend-config=terraform.tfbackend
$ terraform apply
```

### prodction environment
```
$ cd terraform/production
$ cp terraform.tfbackend.example terraform.tfbackend
# edit your setting to terraform.tfbackend
$ cp terraform.tfvars.example terraform.tfvars
# edit your setting to terraform.tfvars
$ terraform init -backend-config=terraform.tfbackend
$ terraform apply
```