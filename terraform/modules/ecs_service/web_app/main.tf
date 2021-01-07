
resource "aws_cloudwatch_log_group" "nginx" {
  name              = "${var.app_name}/${var.environment}/nginx"
  retention_in_days = 30
}

resource "aws_cloudwatch_log_group" "django" {
  name              = "${var.app_name}/${var.environment}/django"
  retention_in_days = 30
}

data "aws_ecr_repository" "django" {
  name = var.django_repository
}

data "aws_ecr_repository" "nginx" {
  name = var.nginx_repository
}

resource "aws_ecs_task_definition" "web_app" {
  family                   = var.family
  cpu                      = var.cpu     # CPUユニットの整数かvCPUの文字列 1vCPU
  memory                   = var.memory  # MiBの整数かGBの文字列 1GB
  network_mode             = "awsvpc"    # fargateならawsvpc
  requires_compatibilities = ["FARGATE"] # 起動タイプ
  container_definitions = templatefile("../modules/ecs_service/web_app/definitions/container_definitions.json", {
    "nginx_log_group" : aws_cloudwatch_log_group.nginx.name
    "django_log_group" : aws_cloudwatch_log_group.django.name
    "nginx_image" : data.aws_ecr_repository.nginx.repository_url
    "django_image" : data.aws_ecr_repository.django.repository_url
    "db_name" : var.db_name
    "db_port" : var.db_port
    "db_host" : var.db_host
    "db_user" : var.db_user
    "db_password" : var.db_password
    "cache_location" : var.cache_location
    "django_secret_key" : var.django_secret_key
    "env_name" : var.environment
    "django_superuser_password" : var.django_superuser_password
    "allowed_hosts" : var.allowed_hosts
    "frontend_url": var.frontend_url
    "AWS_S3_ACCESS_KEY_ID" : var.AWS_S3_ACCESS_KEY_ID
    "AWS_S3_SECRET_ACCESS_KEY" : var.AWS_S3_SECRET_ACCESS_KEY
    "AWS_STORAGE_BUCKET_NAME" : var.AWS_STORAGE_BUCKET_NAME
    "AWS_S3_REGION_NAME" : var.AWS_S3_REGION_NAME
    "AWS_S3_STORAGE_CUSTOM_DOMAIN": var.AWS_S3_STORAGE_CUSTOM_DOMAIN
  })
  execution_role_arn = var.ecs_task_execution_role_arn
  tags = {
    "Name" = "web_app"
  }
}

resource "aws_ecs_service" "web_app" {
  name            = "web_app"
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.web_app.arn
  desired_count   = var.desired_count
  # launch_type                        = "FARGATE"
  platform_version                   = "1.3.0" # デフォルトはLATEST だけど使用は避ける
  health_check_grace_period_seconds  = 60      # デフォルトは0 だけどそれ以上に設定すること
  deployment_maximum_percent         = 200
  deployment_minimum_healthy_percent = 100

  capacity_provider_strategy {
    capacity_provider = "FARGATE"
    base              = 0
    weight            = 1
  }

  capacity_provider_strategy {
    capacity_provider = "FARGATE_SPOT"
    base              = 0
    weight            = 1
  }

  network_configuration {
    assign_public_ip = true
    security_groups  = var.security_groups
    subnets          = var.subnets
  }
  load_balancer {
    target_group_arn = var.target_group_arn
    container_name   = "nginx"
    container_port   = 80
  }
  tags = {
    "Name" = "web_app"
  }
  lifecycle {
    ignore_changes = [desired_count]
  }
}

/*
command
### migrate
aws ecs run-task \
--cluster <your_cluster_name> \
--task-definition <your_migrate_task_definition> \
--network-configuration "awsvpcConfiguration={subnets=[<your_subnet_id>],securityGroups=[<your_security_group_id>],assignPublicIp=ENABLED}"


### superuser
aws ecs run-task \
--cluster <your_cluster_name> \
--task-definition <your_migrate_task_definition> \
--network-configuration "awsvpcConfiguration={subnets=[<your_subnet_id>],securityGroups=[<your_security_group_id>],assignPublicIp=ENABLED}"
--overrides '{"containerOverrides": [{"name":"migrate-backend","command": [ "python", "manage.py", "createsuperuser", "--username", "<your_name>", "--email", "<your_email>", "--noinput" ]}]}'

*/
resource "aws_ecs_task_definition" "migrate" {
  family                   = "${var.app_name}-${var.environment}-migrate"
  cpu                      = var.cpu
  memory                   = var.memory
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  container_definitions = templatefile("../modules/ecs_service/web_app/definitions/migrate_definition.json", {
    "django_log_group" : aws_cloudwatch_log_group.django.name
    "django_image" : data.aws_ecr_repository.django.repository_url
    "db_name" : var.db_name
    "db_port" : var.db_port
    "db_host" : var.db_host
    "db_user" : var.db_user
    "db_password" : var.db_password
    "cache_location" : var.cache_location
    "django_secret_key" : var.django_secret_key
    "env_name" : var.environment
    "django_superuser_password" : var.django_superuser_password
    "frontend_url": var.frontend_url
    "AWS_S3_ACCESS_KEY_ID" : var.AWS_S3_ACCESS_KEY_ID
    "AWS_S3_SECRET_ACCESS_KEY" : var.AWS_S3_SECRET_ACCESS_KEY
    "AWS_STORAGE_BUCKET_NAME" : var.AWS_STORAGE_BUCKET_NAME
    "AWS_S3_REGION_NAME" : var.AWS_S3_REGION_NAME
    "AWS_S3_STORAGE_CUSTOM_DOMAIN": var.AWS_S3_STORAGE_CUSTOM_DOMAIN
  })
  execution_role_arn = var.ecs_task_execution_role_arn
  tags = {
    "Name" = "web_app_migrate"
  }
}
