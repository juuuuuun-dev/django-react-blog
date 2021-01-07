
resource "aws_ecr_repository" "django" {
  name = "${var.app_name}-django"
}
resource "aws_ecr_repository" "nginx" {
  name = "${var.app_name}-nginx"
}

resource "aws_ecr_lifecycle_policy" "django_lifecycle_policy" {
  repository = aws_ecr_repository.django.name
  policy     = file("./ecr_lifecycle_policy.json")
}

resource "aws_ecr_lifecycle_policy" "nginx_lifecycle_policy" {
  repository = aws_ecr_repository.nginx.name
  policy     = file("./ecr_lifecycle_policy.json")
}
