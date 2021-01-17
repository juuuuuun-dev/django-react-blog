data "archive_file" "lambda_functions" {
  type        = "zip"
  source_dir  = "../lambda_functions/sources"
  output_path = "../lambda_functions/archive/sources.zip"
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
    }
  }
}

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.default.id
  parent_id   = aws_api_gateway_rest_api.default.root_resource_id
  path_part   = "{proxy+}"
}
resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = aws_api_gateway_rest_api.default.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
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

resource "aws_api_gateway_method" "proxy_root" {
  rest_api_id   = aws_api_gateway_rest_api.default.id
  resource_id   = aws_api_gateway_rest_api.default.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}
resource "aws_api_gateway_integration" "lambda_root" {
  rest_api_id             = aws_api_gateway_rest_api.default.id
  resource_id             = aws_api_gateway_method.proxy_root.resource_id
  http_method             = aws_api_gateway_method.proxy_root.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.sendmail.invoke_arn
}

resource "aws_api_gateway_deployment" "default" {
  depends_on = [
    aws_api_gateway_integration.lambda,
    aws_api_gateway_integration.lambda_root,
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
