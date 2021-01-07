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
