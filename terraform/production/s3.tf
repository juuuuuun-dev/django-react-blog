module "s3_bucket_for_app_storage" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  bucket        = "${var.app_name}-${var.environment}-storage"
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

# snapshop and file storage backup
data "aws_s3_bucket" "backup_storage" {
  bucket = "${var.app_name}-${var.environment}-backup"
}

output "backup-storage" {
  value = data.aws_s3_bucket.backup_storage.arn
}
