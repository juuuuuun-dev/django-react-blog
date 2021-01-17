resource "aws_api_gateway_rest_api" "default" {
  name        = "${var.app_name}-${var.environment}-api"
  description = "REST API"
}

