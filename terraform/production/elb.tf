/*
terraform-aws-modules / terraform-aws-alb
https://github.com/terraform-aws-modules/terraform-aws-alb

terraformの問題で
access_logsのbacketは同じterraform commandで作成したものでは動作しないので事前に作成する必要がある
https://github.com/hashicorp/terraform-provider-aws/issues/7987
*/


module "alb" {
  source             = "terraform-aws-modules/alb/aws"
  version            = "~> 5.0"
  load_balancer_type = "application"
  name               = "${var.app_name}-${var.environment}-alb"
  vpc_id             = module.vpc.vpc_id
  subnets            = module.vpc.public_subnets
  security_groups = [
    module.http_sg.this_security_group_id,
    module.https_sg.this_security_group_id,
    # module.web_sg.this_security_group_id,
    # module.http_sg.this_security_group_id,
  ]
  internal = false

  https_listeners = [
    {
      port               = 443
      protocol           = "HTTPS"
      certificate_arn    = aws_acm_certificate.default_cert.arn
      target_group_index = 0
    }
  ]

  http_tcp_listeners = [
    # Forward action is default, either when defined or undefined
    {
      port        = 80
      protocol    = "HTTP"
      action_type = "redirect"
      redirect = {
        port        = "443"
        protocol    = "HTTPS"
        status_code = "HTTP_301"
      }
    },
  ]

  target_groups = [
    {
      backend_protocol = "HTTP"
      backend_port     = 80
      action_type      = "forward"
      target_type      = "ip"
      health_check = {
        enabled             = true
        interval            = 60
        path                = "/api/v1/init/"
        port                = "traffic-port"
        healthy_threshold   = 3
        unhealthy_threshold = 3
        timeout             = 6
        protocol            = "HTTP"
        matcher             = "200-399"
      }
    }
  ]

  # target_groups = [
  #   {
  #     backend_protocol = "HTTP"
  #     backend_port     = 80
  #     action_type      = "forward"
  #     target_type      = "ip"
  #     health_check = {
  #       enabled             = true
  #       interval            = 60
  #       path                = "/api/v1/init/"
  #       port                = "traffic-port"
  #       healthy_threshold   = 3
  #       unhealthy_threshold = 3
  #       timeout             = 6
  #       protocol            = "HTTP"
  #       matcher             = "200-399"
  #     }
  #   }
  # ]

  access_logs = {
    bucket  = data.aws_s3_bucket.logs.id
    prefix  = "alb"
    enabled = true
  }

  tags = {
    Environment = var.environment
  }
}
