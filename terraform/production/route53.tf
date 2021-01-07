data "aws_route53_zone" "app_zone" {
  name = var.zone_domain
}

resource "aws_route53_record" "front_record" {
  zone_id = data.aws_route53_zone.app_zone.zone_id
  name    = var.front_record_name
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "api_record" {
  zone_id = data.aws_route53_zone.app_zone.zone_id
  name    = var.api_record_name
  type    = "A"
  alias {
    name                   = module.alb.this_lb_dns_name
    zone_id                = module.alb.this_lb_zone_id
    evaluate_target_health = true
  }
}

resource "aws_acm_certificate" "default" {
  domain_name               = "*.${var.zone_domain}"
  subject_alternative_names = [var.zone_domain]
  validation_method         = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

# validation_methodでDNSを指定した場合の検証用DNSレコード
resource "aws_route53_record" "dns_validation_certificate" {
  # listからsetに変更された
  for_each = {
    for dvo in aws_acm_certificate.default.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }
  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  type            = each.value.type
  zone_id         = data.aws_route53_zone.app_zone.zone_id
  ttl             = 60
}
# 検証の待機 apply時にssl証明書の検証をまつ 実際になにかリソースを作成するわけではない
# resource "aws_acm_certificate_validation" "default" {
#   certificate_arn         = aws_acm_certificate.default.arn
#   validation_record_fqdns = [for record in aws_route53_record.dns_validation_certificate : record.fqdn]
# }
