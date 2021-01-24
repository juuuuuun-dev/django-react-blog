resource "aws_sns_topic" "alarm_topic" {
  name = "alarm_topic"
}

resource "aws_sns_topic_policy" "alarm_topic_policy" {
  arn    = aws_sns_topic.alarm_topic.arn
  policy = data.aws_iam_policy_document.sns_topic_policy.json
}

data "aws_iam_policy_document" "sns_topic_policy" {
  policy_id = "__default_policy_ID"
  statement {
    actions = [
      "SNS:Subscribe",
      "SNS:SetTopicAttributes",
      "SNS:RemovePermission",
      "SNS:Receive",
      "SNS:Publish",
      "SNS:ListSubscriptionsByTopic",
      "SNS:GetTopicAttributes",
      "SNS:DeleteTopic",
      "SNS:AddPermission",
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceOwner"

      values = [
        var.aws_account_id,
      ]
    }

    effect = "Allow"

    principals {
      type = "Service"
      identifiers = [
        "sns.amazonaws.com",
      ]
    }
    resources = [
      aws_sns_topic.alarm_topic.arn,
    ]
    sid = "__default_statement_ID"
  }
}

/*
emailは2021.01段階でterraformでサポートされていない
webでコンソールにログインして設定する必要がある
*/
resource "aws_sns_topic_subscription" "name" {
  topic_arn = aws_sns_topic.alarm_topic.arn
  protocol  = "sqs"
  endpoint  = aws_sqs_queue.alarm_queue.arn

}

