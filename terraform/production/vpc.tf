/*
terraform-aws-modules / terraform-aws-vpc
https://github.com/terraform-aws-modules/terraform-aws-vpc
*/
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> v2.0"
  name    = "${var.app_name}-${var.environment}-vpc"
  cidr    = var.vpc_cidr_block

  azs             = var.availability_zones
  public_subnets  = var.public_subnets
  private_subnets = var.private_subnets

  # enable_nat_gateway   = true
  enable_vpn_gateway   = true
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Terraform   = "true"
    Environment = var.environment
  }
}
