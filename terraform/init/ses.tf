resource "aws_ses_domain_identity" "ses" {
  domain = var.zone_domain
}

resource "aws_route53_record" "ses_record" {
  zone_id = aws_route53_zone.app_zone.zone_id
  name    = "_amazoneses.${aws_route53_zone.app_zone.name}"
  type    = "TXT"
  ttl     = "600"
  records = [aws_ses_domain_identity.ses.verification_token]
}

resource "aws_ses_domain_dkim" "dkim" {
  domain = var.zone_domain
}

resource "aws_route53_record" "dkim_record" {
  count   = 3
  zone_id = aws_route53_zone.app_zone.zone_id
  name    = "${element(aws_ses_domain_dkim.dkim.dkim_tokens, count.index)}._domainkey.${aws_route53_zone.app_zone.name}"
  type    = "CNAME"
  ttl     = "600"
  records = ["${element(aws_ses_domain_dkim.dkim.dkim_tokens, count.index)}.dkim.amazonses.com"]
}
