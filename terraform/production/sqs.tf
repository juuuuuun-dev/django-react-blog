resource "aws_sqs_queue" "alarm_queue" {
  name       = "${var.app_name}-${var.environment}/alarm-queue"
  fifo_queue = true
  tags = {
    "Environment" = var.environment
  }
}
