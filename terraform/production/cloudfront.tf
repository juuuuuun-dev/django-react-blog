data "aws_s3_bucket" "s3_bucket_for_app_storage" {
  bucket = "${var.app_name}-storage"
}

locals {
  s3_origin_id = "${var.app_name}-storage-origin"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = data.aws_s3_bucket.s3_bucket_for_app_storage.bucket_domain_name
    origin_id   = local.s3_origin_id
  }
  enabled             = true
  is_ipv6_enabled     = false
  default_root_object = "index.html"
  logging_config {
    bucket = data.aws_s3_bucket.logs.bucket_domain_name
    prefix = "cloudfront"
  }
  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = true

      cookies {
        forward = "all"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  # @TODO SSL
  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

