variable "aws_region" {
  description = "AWS default region"
}
variable "app_name" {
  description = "App name"
  default     = "example"
}
variable "environment" {
  description = "Environment name"
  default     = "dev"
}

variable "aws_account_id" {
  description = "AWS account id"
}

/*
  ROUTE53
*/
variable "zone_domain" {
  description = "Zone domain"
}
variable "front_record_name" {
  description = "Host zone font record name"
}
variable "api_record_name" {
  description = "Host zone api record name"
}
variable "api_gateway_record_name" {
  description = "Api gateway record name"
}


/*
  VPC
*/
variable "vpc_cidr_block" {
  description = "VPC CIDR block"
  default     = "10.0.0.0/16"
}

variable "public_subnets" {
  description = "CIDR Bock for public subnets"
  type        = list(string)
  default = [
    "10.0.1.0/24",
    "10.0.2.0/24",
  ]
}
variable "private_subnets" {
  description = "CIDR Bock for private subnets"
  type        = list(string)
  default = [
    "10.0.21.0/24",
    "10.0.22.0/24",
  ]
}

variable "availability_zones" {
  description = "Availability zones"
  type        = list(string)
  default = [
    "ap-northeast-1a",
    "ap-northeast-1c"
  ]
}

/*
  ECR
*/
variable "django_repository" {
  description = "App repository name"
}

variable "nginx_repository" {
  description = "Nginx repository name"
}

/*
  RDS
*/
variable "db_engine" {
  description = "Database engine"
  default     = "mysql"
}
variable "db_engine_version" {
  description = "Database engine version"
  default     = "5.7.19"
}
variable "db_instance_class" {
  description = "Database instance class"
  default     = "db.t2.micro"
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


/*
  Django
*/
variable "django_secret_key" {
  description = "Django app secrete key"
}
variable "django_superuser_password" {
  description = "Django app superuser password"
}
variable "django_additional_allowed_hosts" {
  description = "Django app additional allowed hosts"
  default     = ""
}
variable "AWS_S3_ACCESS_KEY_ID" {
  description = "Used in Django app"
}
variable "AWS_S3_SECRET_ACCESS_KEY" {
  description = "Used in Django app"
}

/*
SES
*/
variable "ses_sendmail_from_email_address" {
  description = "Used to send email with SES"
}
variable "send_sns_message_to_email_address" {
  description = "Send sns message to email address"
}
