data "aws_ecs_task_definition" "batch" {
  task_definition = "${var.app_name}-${var.environment}-batch"
}

resource "aws_cloudwatch_event_rule" "ping_google_sitemap_every_day" {
  name                = "${var.app_name}-${var.environment}-ping-google-sitemap"
  description         = "pging google sitemap"
  schedule_expression = "cron(0 13 * * ? *)"
}


resource "aws_cloudwatch_event_target" "ping_google_sitemap_task" {
  target_id = "ping_google_run-scheduled-task-every-day"
  arn       = module.ecs.this_ecs_cluster_arn
  rule      = aws_cloudwatch_event_rule.ping_google_sitemap_every_day.name
  role_arn  = module.container_event_role.this_iam_role_arn

  ecs_target {
    task_count          = 1
    launch_type         = "FARGATE"
    platform_version    = "LATEST"
    task_definition_arn = data.aws_ecs_task_definition.batch.id
    network_configuration {
      assign_public_ip = true
      subnets          = module.vpc.public_subnets
      security_groups  = [module.http_sg.this_security_group_id]
    }
  }


  input      = <<DOC
{
  "containerOverrides": [
    {
      "name": "${var.app_name}-${var.environment}-batch",
      "command": ["python", "manage.py", "ping_google", "/sitemaps/sitemap.xml"]
    }
  ]
}
DOC
  depends_on = [data.aws_ecs_task_definition.batch]
}

