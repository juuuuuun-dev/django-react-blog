variable "app_name" {
  description = "App name"
}
variable "environment" {
  description = "environment name"
}
variable "cluster_arn" {
  description = "The ECS cluster ARN"
  type        = string
}

variable "cluster_id" {
  description = "The ECS cluster ID"
  type        = string
}

variable "family" {
  description = "The ECS cluster family"
  type        = string
}
variable "cpu" {
  description = "The task cpu"
  type        = string
  default     = "256"
}
variable "memory" {
  description = "The task memory"
  type        = string
  default     = "512"
}

variable "desired_count" {
  description = "The instances count"
  type        = number
  default     = 2
}

variable "vpc_id" {
  type = string
}


variable "target_group_arn" {
  type = string
}

variable "ecs_task_execution_role_arn" {
  type = string
}

variable "security_groups" {
  type = list(string)
}

variable "subnets" {
  type = list(string)
}

variable "django_repository" {
  description = "App repository name"
}

variable "nginx_repository" {
  description = "Nginx repository name"
}

variable "db_user" {
  description = "Database user name"
}
variable "db_password" {
  description = "Database password"
}

variable "db_port" {
  description = "Database port"
}

variable "db_name" {
  description = "Database name"
}
variable "db_host" {
  description = "Database host"
}

variable "cache_location" {
  description = "Elasticache endpoint"
}

variable "django_secret_key" {
  description = "Django app secrete key"
}
variable "django_superuser_password" {
  description = "Django app superuser password"
}
variable "allowed_hosts" {
  description = "Django app allowed hosts"
}

variable "frontend_url" {
  description = "Frontend URL"
}

variable "api_gateway_url" {
  description = "API Gateway url"
}

variable "AWS_S3_ACCESS_KEY_ID" {
  description = "Used in Django app"
}

variable "AWS_S3_SECRET_ACCESS_KEY" {
  description = "Used in Django app"
}
variable "AWS_STORAGE_BUCKET_NAME" {
  description = "Used in Django app"
}
variable "AWS_S3_REGION_NAME" {
  description = "Used in Django app"
}
variable "AWS_S3_STORAGE_CUSTOM_DOMAIN" {
  description = "If use Cloudfront, Cloudfront domain"
  default     = ""
}
