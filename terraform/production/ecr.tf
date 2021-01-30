
resource "aws_ecr_repository" "django" {
  name = "${var.app_name}-${var.environment}-django"
}
resource "aws_ecr_repository" "nginx" {
  name = "${var.app_name}-${var.environment}-nginx"
}

resource "aws_ecr_lifecycle_policy" "django_lifecycle_policy" {
  repository = aws_ecr_repository.django.name
  policy     = file("./ecr_lifecycle_policy.json")
}

resource "aws_ecr_lifecycle_policy" "nginx_lifecycle_policy" {
  repository = aws_ecr_repository.nginx.name
  policy     = file("./ecr_lifecycle_policy.json")
}
