# private
# resource "aws_s3_bucket" "private" {
#   bucket = "my-test-private-pragmatic-terraform" # name
#   versioning {
#     enabled = true
#   }
#   # 暗号化
#   server_side_encryption_configuration {
#     rule {
#       apply_server_side_encryption_by_default {
#         sse_algorithm = "AES256"
#       }
#     }
#   }
# }

# resource "aws_s3_bucket_public_access_block" "private" {
#   bucket                  = aws_s3_bucket.private.id
#   block_public_acls       = true
#   block_public_policy     = true
#   ignore_public_acls      = true
#   restrict_public_buckets = true
# }

# public
# resource "aws_s3_bucket" "public" {
#   bucket = "my-test-public-pragmatic-terraform"
#   acl    = "public-read"
#   cors_rule {
#     allowed_origins = ["https://example.com"]
#     allowed_methods = ["GET"]
#     allowed_headers = ["*"]
#     max_age_seconds = 3000

#   }
# }

# log rotate
# resource "aws_s3_bucket" "alb_log" {
#   bucket        = "my-test-alb-log"
#   force_destroy = true

#   lifecycle_rule {
#     enabled = true
#     expiration {
#       days = "30"
#     }
#   }
# }


data "aws_s3_bucket" "logs" {
  bucket = "my-app-${var.app_name}-logs"
}

# data "aws_s3_bucket" "alb_log" {
#   bucket = "my-test-alb-log"
# }
# resource "aws_s3_bucket_policy" "name" {
#   bucket = data.aws_s3_bucket.alb_log.id
#   policy = data.aws_iam_policy_document.alb_log.json
# }

# data "aws_iam_policy_document" "alb_log" {
#   statement {
#     effect    = "Allow"
#     actions   = ["s3:PutObject"]
#     resources = ["arn:aws:s3:::${data.aws_s3_bucket.alb_log.id}/*"]

#     principals {
#       type        = "AWS"
#       identifiers = ["582318560864"] # alb account id https://docs.aws.amazon.com/ja_jp/elasticloadbalancing/latest/classic/enable-access-logs.html
#     }
#   }
# }


# s3 policy
# resource "aws_s3_bucket_policy" "name" {
#   bucket = aws_s3_bucket.alb_log.id
#   policy = data.aws_iam_policy_document.alb_log.json
# }

# data "aws_iam_policy_document" "alb_log" {
#   statement {
#     # effect    = "Allow"
#     actions   = ["s3:PutObject"]
#     resources = ["arn:aws:s3:::${aws_s3_bucket.alb_log.id}/*"]

#     principals {
#       type        = "AWS"
#       identifiers = ["582318560864"] # alb account id https://docs.aws.amazon.com/ja_jp/elasticloadbalancing/latest/classic/enable-access-logs.html
#     }
#   }
# }
