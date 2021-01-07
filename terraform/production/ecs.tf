/*
terraform-aws-modules/terraform-aws-ecs
https://github.com/terraform-aws-modules/terraform-aws-ecs
*/

module "ecs" {
  source             = "terraform-aws-modules/ecs/aws"
  version            = "~> 2.0"
  name               = "${var.app_name}-${var.environment}-ecs"
  container_insights = true
  capacity_providers = ["FARGATE", "FARGATE_SPOT"]
  default_capacity_provider_strategy = {
    capacity_provider = "FARGATE"
    base              = 0
    weight            = 1
  }

  tags = {
    Environment = var.environment
  }
}

module "web_app" {
  source      = "../modules/ecs_service/web_app"
  cluster_arn = module.ecs.this_ecs_cluster_arn
  cluster_id  = module.ecs.this_ecs_cluster_id
  family                      = "${var.app_name}-${var.environment}"
  target_group_arn            = element(module.alb.target_group_arns, 0)
  ecs_task_execution_role_arn = module.ecs_task_execution_role.this_iam_role_arn
  security_groups             = [module.http_sg.this_security_group_id]
  subnets                     = module.vpc.public_subnets
  desired_count             = 1
  app_name                  = var.app_name
  environment               = var.environment
  vpc_id                    = module.vpc.vpc_id
  django_repository         = var.django_repository
  nginx_repository          = var.nginx_repository
  db_host                   = module.db.this_db_instance_address
  db_name                   = var.db_name
  db_user                   = var.db_user
  db_password               = var.db_password
  db_port                   = var.db_port
  cache_location            = aws_elasticache_cluster.default.configuration_endpoint
  django_secret_key         = var.django_secret_key
  django_superuser_password = var.django_superuser_password
  allowed_hosts             = "${module.alb.this_lb_dns_name},${var.front_record_name}.${var.zone_domain},${aws_cloudfront_distribution.s3_distribution.domain_name}"
  
  AWS_S3_ACCESS_KEY_ID      = var.AWS_S3_ACCESS_KEY_ID
  AWS_S3_SECRET_ACCESS_KEY  = var.AWS_S3_SECRET_ACCESS_KEY
  AWS_S3_REGION_NAME        = var.aws_region
  AWS_STORAGE_BUCKET_NAME   = "${var.app_name}-storage"
  # @TODO dns解決したらdomainを変更する
  frontend_url = aws_cloudfront_distribution.s3_distribution.domain_name
  AWS_S3_STORAGE_CUSTOM_DOMAIN = aws_cloudfront_distribution.s3_distribution.domain_name
  # frontend_url = "${var.front_record_name}.${var.zone_domain}"
}


resource "aws_appautoscaling_target" "ecs_target" {
  service_namespace  = "ecs"
  resource_id        = "service/${module.ecs.this_ecs_cluster_name}/${module.web_app.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  min_capacity       = 1
  max_capacity       = 3
  # role_arn 
}

resource "aws_appautoscaling_policy" "ecs_policy_memory" {
  name               = "memory-autoscaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs_target.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs_target.service_namespace
  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }
    target_value       = 80
    scale_in_cooldown  = 300
    scale_out_cooldown = 300
  }
}

resource "aws_appautoscaling_policy" "ecs_policy_cpu" {
  name               = "cpu-autoscaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs_target.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs_target.service_namespace
  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value       = 60
    scale_in_cooldown  = 300
    scale_out_cooldown = 300
  }
}
