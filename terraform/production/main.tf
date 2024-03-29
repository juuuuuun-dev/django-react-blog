/*
terraform init -backend-config=terraform.tfbackend
*/

terraform {
  required_version = "0.14.7"
  backend "s3" {}
}

provider "aws" {
  region  = var.aws_region
  version = "3.18.0"
}

provider "aws" {
  alias   = "virginia"
  region  = "us-east-1"
  version = "3.18.0"
}
