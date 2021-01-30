
module "s3_bucket_for_logs" {
  source                         = "terraform-aws-modules/s3-bucket/aws"
  bucket                         = "${var.app_name}-production-logs"
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
