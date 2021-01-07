terraform {
  required_version = ">=0.13"
  backend "s3" {
    bucket = "my-app-terraform-tfstates"
    key    = "develop-terraform.tfstate"
    region = "ap-northeast-1"
  }
}

provider "aws" {
  region  = "ap-northeast-1"
  version = "3.18.0"
}
