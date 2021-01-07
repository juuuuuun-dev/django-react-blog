resource "aws_route53_zone" "app_zone" {
  name = var.zone_domain
}