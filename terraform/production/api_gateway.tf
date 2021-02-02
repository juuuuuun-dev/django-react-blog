
resource "aws_api_gateway_rest_api" "default" {
  name        = "${var.app_name}-${var.environment}-api"
  description = "REST API"
}

resource "aws_api_gateway_domain_name" "default" {
  domain_name              = "${var.api_gateway_record_name}.${var.zone_domain}"
  regional_certificate_arn = aws_acm_certificate_validation.default_validation.certificate_arn

  endpoint_configuration {
    types = ["REGIONAL"]
  }
  depends_on = [aws_acm_certificate_validation.default_validation]
}

resource "aws_api_gateway_base_path_mapping" "default" {
  api_id      = aws_api_gateway_rest_api.default.id
  stage_name  = aws_api_gateway_deployment.default.stage_name
  domain_name = aws_api_gateway_domain_name.default.domain_name
}
