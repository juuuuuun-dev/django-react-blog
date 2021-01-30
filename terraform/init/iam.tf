/*
terraform-aws-modules / terraform-aws-iam
https://github.com/terraform-aws-modules/terraform-aws-iam
*/


# data "aws_iam_policy_document" "s3_static_website_policy" {
#   statement {
#     sid     = "PublicReadAndPutGetObject"
#     effect  = "Allow"
#     actions = ["s3:GetObject"]
#     principals {
#       type        = "*"
#       identifiers = ["*"]
#     }
#     resources = [
#       "${module.s3_bucket_for_app_storage.this_s3_bucket_arn}/*",
#     ]
#   }
# }
