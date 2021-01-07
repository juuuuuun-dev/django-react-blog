module "s3_bucket_for_logs" {
  source                         = "terraform-aws-modules/s3-bucket/aws"
  bucket                         = "my-app-${var.app_name}-logs"
  acl                            = "log-delivery-write"
  block_public_policy            = true
  block_public_acls              = true
  force_destroy                  = true
  attach_elb_log_delivery_policy = true
  lifecycle_rule = [
    {
      id      = "log"
      enabled = true
      prefix  = "log/"
      tags = {
        rule      = "log"
        autoclean = "true"
      }
      expiration = {
        days = 60
      }
    },
  ]
}


# app media storage static website
module "s3_bucket_for_app_storage" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  bucket        = "${var.app_name}-storage"
  acl           = "public-read"
  attach_policy = true
  # policy        = data.aws_iam_policy_document.bucket_policy.json
  policy = data.aws_iam_policy_document.s3_static_website_policy.json
  website = {
    index_document = "index.html"
    error_document = "error.html"
  }
  # S3 bucket-level Public Access Block configuration
  # block_public_acls       = true
  # block_public_policy     = true
  # ignore_public_acls      = true
  # restrict_public_buckets = true
}



# @TODO junkata-blog-build-source
# module "s3_bucket_for_app_storage" {
#   source = "terraform-aws-modules/s3-bucket/aws"
#   bucket = "${var.app_name}-storage"
#   acl    = "public-read"
# }
