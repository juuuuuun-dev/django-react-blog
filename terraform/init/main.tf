terraform {
  required_version = ">=0.13"
  backend "s3" {
    bucket = "my-app-terraform-tfstates"
    key    = "init-terraform.tfstate"
    region = "ap-northeast-1"
  }
}


provider "aws" {
  region  = var.aws_region
  version = "3.18.0"
}
