/*
comparison_operator value
閾値 比較演算
GreaterThanOrEqualToThreshold >= 以上
GreaterThanThreshold > 超過
LessThanThreshold < 未満
LessThanOrEqualToThreshold <= 以下
# 異常検出モデルの場合は下記も使用可能
GreaterThanUpperThreshold > 超過
LessThanLowerThreshold < 未満
LessThanLowerOrGreaterThanUpperThreshold < || >

namespaceとmetric_nameとdimensionsで使用できるもの
https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html

# dimensions
任意のディメンションを使用してフィルタリングできる

# alarm_actions
アラームの状態になった際に連携するactions list(arn)

# ok_actions
アラーム状態が終わった際に連携するactions
*/
resource "aws_cloudwatch_metric_alarm" "rds_cpu" {
  alarm_name          = "${var.app_name}-${var.environment}/RDS/CPU"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1
  period              = 60
  namespace           = "AWS/RDS"
  metric_name         = "CPUUtilization"
  statistic           = "Average"
  threshold           = 80
  alarm_description   = "This metric monitors rds cpu utilization"
  alarm_actions       = [aws_sns_topic.alarm_topic.arn]
  ok_actions          = [aws_sns_topic.alarm_topic.arn]
}
