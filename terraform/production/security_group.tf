/**
terraform-aws-modules/terraform-aws-security-group
https://github.com/terraform-aws-modules/terraform-aws-security-group
*/

module "http_sg" {
  source      = "terraform-aws-modules/security-group/aws//modules/http-80"
  version     = "~> 3.0"
  name        = "${var.app_name}_${var.environment}_http_sg"
  description = "${var.app_name}_${var.environment} http security group"
  vpc_id      = module.vpc.vpc_id
  # vpc_id              = aws_vpc.example.id
  ingress_cidr_blocks = ["0.0.0.0/0"]
}

module "https_sg" {
  source      = "terraform-aws-modules/security-group/aws//modules/https-443"
  version     = "~> 3.0"
  name        = "${var.app_name}_${var.environment}_https_sg"
  description = "${var.app_name}_${var.environment} https security group"
  vpc_id      = module.vpc.vpc_id
  # vpc_id              = aws_vpc.example.id
  ingress_cidr_blocks = ["0.0.0.0/0"]
}


module "mysql_sg" {
  source      = "terraform-aws-modules/security-group/aws//modules/mysql"
  version     = "~> 3.0"
  name        = "${var.app_name}_${var.environment}_mysql_sg"
  description = "${var.app_name}_${var.environment} mysql security group"
  vpc_id      = module.vpc.vpc_id
  # ingress_cidr_blocks = [
  #   module.vpc.vpc_cidr_block
  # ]
  ingress_cidr_blocks = ["0.0.0.0/0"]
  ingress_with_source_security_group_id = [
    {
      from_port = 80
      to_port   = 80
      protocol  = 6
      # source_security_group_id = module.web_sg.this_security_group_id
      source_security_group_id = module.http_sg.this_security_group_id
    },
  ]
}


