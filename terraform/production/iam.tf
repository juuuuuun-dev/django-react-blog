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


data "aws_iam_policy_document" "s3_static_website_policy" {
  statement {
    sid     = "PublicReadAndPutGetObject"
    effect  = "Allow"
    actions = ["s3:GetObject"]
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    resources = [
      "${module.s3_bucket_for_app_storage.this_s3_bucket_arn}/*",
    ]
  }
}


module "container_event_role" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-assumable-role"
  version = "~> 3.0"

  # principals service
  trusted_role_services = [
    "events.amazonaws.com",
  ]

  create_role       = true
  role_requires_mfa = false
  role_name         = "${var.app_name}_${var.environment}_event_role"
  custom_role_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceEventsRole",
  ]
}


/**
backup
*/
module "s3_snapshop_backup_storage_policy" {
  version     = "~> 3.0"
  source      = "terraform-aws-modules/iam/aws//modules/iam-policy"
  name        = "s3_snapshop_backup_storage_policy"
  description = "S3 snapshop backup storage policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
        {
            "Sid": "ExportPolicy",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject*",
                "s3:ListBucket",
                "s3:GetObject*",
                "s3:DeleteObject*",
                "s3:GetBucketLocation"
            ],
            "Resource": [
                "${data.aws_s3_bucket.backup_storage.arn}",
                "${data.aws_s3_bucket.backup_storage.arn}/*"
            ]
        }
    ]
}
EOF
}


module "rds_s3_export_role" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-assumable-role"
  version = "~> 3.0"

  # principals service
  trusted_role_services = [
    "export.rds.amazonaws.com",
  ]
  custom_role_policy_arns = [
    module.s3_snapshop_backup_storage_policy.arn
  ]

  create_role       = true
  role_requires_mfa = false
  role_name         = "${var.app_name}_${var.environment}_rds_s3_export_role"
}
