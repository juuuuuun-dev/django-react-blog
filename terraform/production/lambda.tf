data "archive_file" "lambda_functions" {
  type        = "zip"
  source_dir  = "../lambda_functions/sources"
  output_path = "../lambda_functions/archive/sources.zip"
}

locals {
  allow_origin = "https://${var.api_record_name}.${var.zone_domain}"
}

resource "aws_lambda_function" "sendmail" {
  function_name    = "sendmail"
  handler          = "sendmail.handler"
  role             = module.lambda_role.this_iam_role_arn
  runtime          = "python3.8"
  filename         = data.archive_file.lambda_functions.output_path
  source_code_hash = data.archive_file.lambda_functions.output_base64sha256
  environment {
    variables = {
      FROM_EMAIL_ADDRESS = var.ses_sendmail_address
      REGION             = var.aws_region
      ALLOW_ORIGIN       = local.allow_origin
    }
  }
}

resource "aws_cloudwatch_log_group" "lambda_sendmail_logs" {
  name              = "/aws/lambda/${aws_lambda_function.sendmail.function_name}"
  retention_in_days = 30
}

# resource "aws_iam_role_policy_attachment" "lambda_sendmail_logs" {
# }

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.default.id
  parent_id   = aws_api_gateway_rest_api.default.root_resource_id
  path_part   = "sendmail"
}
resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = aws_api_gateway_rest_api.default.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda" {
  rest_api_id             = aws_api_gateway_rest_api.default.id
  resource_id             = aws_api_gateway_resource.proxy.id
  http_method             = aws_api_gateway_method.proxy.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.sendmail.invoke_arn
}
# cors
resource "aws_api_gateway_method_response" "post_200" {
  rest_api_id = aws_api_gateway_rest_api.default.id
  resource_id = aws_api_gateway_resource.proxy.id
  http_method = aws_api_gateway_method.proxy.http_method
  status_code = "200"
  response_models = {
    "application/json" = "Empty"
  }
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin"  = true
  }

}
resource "aws_api_gateway_integration_response" "post_200" {
  rest_api_id       = aws_api_gateway_rest_api.default.id
  resource_id       = aws_api_gateway_resource.proxy.id
  http_method       = aws_api_gateway_method.proxy.http_method
  status_code       = aws_api_gateway_method_response.post_200.status_code
  selection_pattern = "200"
  response_templates = {
    "application/json" = ""
  }
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'POST'",
    "method.response.header.Access-Control-Allow-Origin"  = "'${local.allow_origin}'"
  }
}

resource "aws_api_gateway_deployment" "default" {
  depends_on = [
    aws_api_gateway_integration.lambda,
  ]
  rest_api_id = aws_api_gateway_rest_api.default.id
  stage_name  = var.environment
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.sendmail.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.default.execution_arn}/*/*"
}
