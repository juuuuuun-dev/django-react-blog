/*
terraform-aws-modules / terraform-aws-alb
https://github.com/terraform-aws-modules/terraform-aws-alb

terraformの問題で
access_logsのbacketは同じterraform commandで作成したものでは動作しないので事前に作成する必要がある
https://github.com/hashicorp/terraform-provider-aws/issues/7987
*/

# module "http_sg" {
#   source           = "./security_group"
#   name             = "http-sg"
#   vpc_id           = aws_vpc.example.id
#   port             = 80
#   cidr_blocks      = ["0.0.0.0/0"]
#   ipv6_cidr_blocks = ["::/0"]
# }



module "alb" {
  source             = "terraform-aws-modules/alb/aws"
  version            = "~> 5.0"
  load_balancer_type = "application"
  name               = "${var.app_name}-${var.environment}-alb"
  vpc_id             = module.vpc.vpc_id
  subnets            = module.vpc.public_subnets
  # vpc_id = aws_vpc.example.id
  # subnets = [
  #   aws_subnet.public_1a.id,
  #   aws_subnet.public_1c.id
  # ]
  security_groups = [
    # module.http_sg.security_group_id,
    module.http_sg.this_security_group_id,
  ]
  internal = false

  http_tcp_listeners = [
    # Forward action is default, either when defined or undefined
    {
      port               = 80
      protocol           = "HTTP"
      target_group_index = 0
      action_type        = "forward"
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

  access_logs = {
    bucket  = data.aws_s3_bucket.logs.id
    prefix  = "alb"
    enabled = true
  }

  tags = {
    Environment = var.environment
  }
}



# resource "aws_lb" "example" {
#   name                       = "example"
#   load_balancer_type         = "application" # network or application NLBは大規模用
#   internal                   = false         #VPC内部向けか
#   idle_timeout               = 60
#   enable_deletion_protection = false # 削除保護
#   subnets = [
#     aws_subnet.public_1a.id,
#     aws_subnet.public_1c.id
#   ]
#   access_logs {
#     bucket  = aws_s3_bucket.alb_log.id
#     enabled = true
#   }

#   security_groups = [
#     module.http_sg.security_group_id,
#     module.https_sg.security_group_id,
#     module.http_redirect_sg.security_group_id,
#   ]
#   tags = {
#     "Name" = "example"
#   }
# }

# output "alb_dns_name" {
#   value = aws_lb.example.dns_name
# }

# resource "aws_lb_listener" "http" {
#   load_balancer_arn = aws_lb.example.arn
#   port              = 80
#   protocol          = "HTTP"
#   default_action {
#     # type = "fixed-response"
#     type             = "forward" #とりあえずforwardでやる
#     target_group_arn = aws_lb_target_group.example.arn
#     fixed_response {
#       content_type = "text/plain"
#       message_body = "this is http"
#       status_code  = "200"
#     }
#   }
# }


# # http リスナー
# resource "aws_lb_listener" "redirect_http_to_https" {
#   load_balancer_arn = aws_lb.example.arn
#   port              = 8080
#   protocol          = "HTTP"
#   default_action {
#     type = "redirect"
#     redirect {
#       port        = 443
#       protocol    = "HTTPS"
#       status_code = "HTTP_301"
#     }
#   }
# }

# # ターゲットグループ
# resource "aws_lb_target_group" "example" {
#   name                 = "example"
#   target_type          = "ip"
#   vpc_id               = aws_vpc.example.id
#   port                 = 80
#   protocol             = "HTTP" # httpsの終端はALBで行う
#   deregistration_delay = 300    # 登録解除の待機時間
#   health_check {
#     path                = "/"
#     healthy_threshold   = 5 # 正常判定実行回数
#     unhealthy_threshold = 2 # 異常判定実行回数
#     timeout             = 5
#     interval            = 30  # 実行感覚
#     matcher             = 200 # 正常判定HTTP status code
#     port                = "traffic-port"
#     protocol            = "HTTP"
#   }
#   depends_on = [aws_lb.example]
# }

