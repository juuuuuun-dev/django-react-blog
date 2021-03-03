# Django React/TypeScript Terrafrom/AWS Blog

This is a blog using Django, React, TypeScript, Ant Design, Jest, React Testing Library, JSON-LD, CircleCi and Teffaform/AWS.  
Terraform uses AWS Fargate, RDS, S3, CloudFront, lambda and Api Gataway, etc.

# Example

My blog: [https://blog.junkata.com](https://blog.junkata.com)

<!-- TODO screen shot -->

![image1](https://user-images.githubusercontent.com/60050242/106447082-6bce9380-64c4-11eb-9090-0701fe7e9699.jpg)
![image2](https://user-images.githubusercontent.com/60050242/106447152-7c7f0980-64c4-11eb-83e8-c9b2d16a5375.jpg)

# Docker setup

```sh
cp backend/django/.env.example backend/django/.env
docker-compose up -d
```

# Django setup

```sh
docker-compose exec django /bin/bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic
```

### Django admin

http://localhost:8000/admin/

# Frontend setup

```sh
cd frontend
cp .env.example .env
yarn install
yarn start
```

# Terraform setup

### Initialize

```sh
$ cd terraform/init
$ cp terraform.tfbackend.example terraform.tfbackend # Update terraform.tfbackend to your settings
$ cp terraform.tfvars.example terraform.tfvars # Update terraform.tfvars to your settings
$ terraform init -backend-config=terraform.tfbackend
$ terraform apply
```

### Prodction environment apply

You need to **terraform apply** with terraform/init directory first

```sh
$ cd terraform/production
$ cp terraform.tfbackend.example terraform.tfbackend # Update terraform.tfbackend to your settings
$ cp terraform.tfvars.example terraform.tfvars # Update terraform.tfvars to your settings
$ terraform init -backend-config=terraform.tfbackend
$ terraform apply
```

### Production initial setup aws cli command

- migrate
  Overrides and use batch-definition

```sh
aws ecs run-task \
--cluster <cluster-name> \
--task-definition <batch-definition-name> \
--network-configuration "awsvpcConfiguration={subnets=[<your-subnet-id>],securityGroups=[<your-sg-id>],assignPublicIp=ENABLED}" \
--overrides '{"containerOverrides": [{"name":"<batcn-definition-name>","command": [ "python", "manage.py", "migrate" ]}]}'
```

- Django createsuperuser  
  Overrides and use batch-definition

```sh
aws ecs run-task \
--cluster <cluster-name> \
--task-definition <batch-definition-name> \
--network-configuration "awsvpcConfiguration={subnets=[<your-subnet-id>],securityGroups=[<your-sg-id>],assignPublicIp=ENABLED}" \
--overrides '{"containerOverrides": [{"name":"<batcn-definition-name>","command": [ "python", "manage.py", "createsuperuser", "--username", "<your-name>", "--email", "<your-email>", "--noinput" ]}]}'
```

- Django collectstatic  
  Overrides and use batch-definition

```sh
aws ecs run-task \
--cluster <cluster-name> \
--task-definition <batcn-definition-name> \
--network-configuration "awsvpcConfiguration={subnets=[<your-subnet-id>],securityGroups=[<your-sg-id>],assignPublicIp=ENABLED}" \
--overrides '{"containerOverrides": [{"name":"<batcn-definition-name>","command": [ "python", "manage.py", "collectstatic", "--noinput" ]}]}'
```
