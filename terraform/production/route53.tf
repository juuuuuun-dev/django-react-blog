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

provider "aws" {
  alias  = "virginia"
  region = "us-east-1"
}

/*
virginia region for cloudfornt
*/
resource "aws_acm_certificate" "virginia_cert" {
  domain_name               = "*.${var.zone_domain}"
  subject_alternative_names = [var.zone_domain]
  validation_method         = "DNS"
  # Most be virginia region
  provider = aws.virginia
  lifecycle {
    create_before_destroy = true
  }
  tags = {
    "Name" : "Virginia cert"
  }
}
/*
default region cert
*/
resource "aws_acm_certificate" "default_cert" {
  domain_name               = "*.${var.zone_domain}"
  subject_alternative_names = [var.zone_domain]
  validation_method         = "DNS"
  lifecycle {
    create_before_destroy = true
  }
  tags = {
    "Name" : "Default region cert"
  }
}

resource "aws_route53_record" "virginia_dns_validation_certificate" {
  for_each = {
    for dvo in aws_acm_certificate.virginia_cert.domain_validation_options : dvo.domain_name => {
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
resource "aws_route53_record" "default_dns_validation_certificate" {
  for_each = {
    for dvo in aws_acm_certificate.default_cert.domain_validation_options : dvo.domain_name => {
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
resource "aws_acm_certificate_validation" "virginia_validation" {
  # Most be virginia region
  provider                = aws.virginia
  certificate_arn         = aws_acm_certificate.virginia_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.virginia_dns_validation_certificate : record.fqdn]
}
resource "aws_acm_certificate_validation" "default_validation" {
  certificate_arn         = aws_acm_certificate.default_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.default_dns_validation_certificate : record.fqdn]
}

