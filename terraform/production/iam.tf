/*
terraform-aws-modules / terraform-aws-iam
https://github.com/terraform-aws-modules/terraform-aws-iam
*/

# ecs task excution role
module "ecs_task_execution_role" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-assumable-role"
  version = "~> 3.0"

  # principals service
  trusted_role_services = [
    "ecs.amazonaws.com",
    "ecs-tasks.amazonaws.com"
  ]
  custom_role_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy",
    module.esc_custom_policy.arn
  ]

  create_role       = true
  role_requires_mfa = false
  role_name         = "${var.app_name}_${var.environment}_ecs_task_excution"
}

module "esc_custom_policy" {
  source      = "terraform-aws-modules/iam/aws//modules/iam-policy"
  name        = "esc_custom_policy"
  path        = "/"
  description = "esc_custom_policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ssm:GetParameters",
        "kms:Decrypt"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}



module "lambda_role" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-assumable-role"
  version = "~> 3.0"

  # principals service
  trusted_role_services = [
    "lambda.amazonaws.com",
  ]
  custom_role_policy_arns = [
    module.ses_send_policy.arn,
    module.logging_policy.arn,
    "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
  ]

  create_role       = true
  role_requires_mfa = false
  role_name         = "${var.app_name}_${var.environment}_lambda_role"
}


# module "sns_role" {
#   source  = "terraform-aws-modules/iam/aws//modules/iam-assumable-role"
#   version = "~> 3.0"

#   trusted_role_services = [
#     "sns.amazonaws.com",
#   ]
#   custom_role_policy_arns = [
#     module.sns_topic_policy.arn,
#   ]

#   create_role       = true
#   role_requires_mfa = false
#   role_name         = "${var.app_name}_${var.environment}_lambda_role"
# }

module "ses_send_policy" {
  version     = "~> 3.0"
  source      = "terraform-aws-modules/iam/aws//modules/iam-policy"
  name        = "ses_send_policy"
  description = "ses send policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:ses:*:*:*"
    }
  ]
}
EOF
}

module "logging_policy" {
  version     = "~> 3.0"
  source      = "terraform-aws-modules/iam/aws//modules/iam-policy"
  name        = "logging_policy"
  description = "logging policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
EOF
}


# module "sns_topic_policy" {
#   version     = "~> 3.0"
#   source      = "terraform-aws-modules/iam/aws//modules/iam-policy"
#   name        = "sns_topic_policy"
#   description = "SNS topic policy"

#   policy = <<EOF
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Action": [
#         "SNS:Subscribe",
#         "SNS:SetTopicAttributes",
#         "SNS:RemovePermission",
#         "SNS:Receive",
#         "SNS:Publish",
#         "SNS:ListSubscriptionsByTopic",
#         "SNS:GetTopicAttributes",
#         "SNS:DeleteTopic",
#         "SNS:AddPermission",
#       ],
#       "Effect": "Allow",
#       "Resource": [
#         ${aws_sns_topic.rds_topic.arn}
#       ]
#     }
#   ]
# }
# EOF
# }
