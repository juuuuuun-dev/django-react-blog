data "aws_route53_zone" "app_zone" {
  name = var.zone_domain
}

resource "aws_route53_record" "front_record" {
  zone_id = data.aws_route53_zone.app_zone.zone_id
  name    = var.frontend_record_name
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

resource "aws_route53_record" "api_gateway_record" {
  zone_id = data.aws_route53_zone.app_zone.zone_id
  name    = aws_api_gateway_domain_name.default.domain_name
  type    = "A"
  alias {
    name                   = aws_api_gateway_domain_name.default.regional_domain_name
    zone_id                = aws_api_gateway_domain_name.default.regional_zone_id
    evaluate_target_health = true
  }
}

