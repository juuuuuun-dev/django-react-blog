import os

import boto3

FROM_EMAIL = os.environ["FROM_EMAIL_ADDRESS"]
TO_EMAIL = os.environ["TO_EMAIL_ADDRESS"]
REGION = os.environ["REGION"]


def send_sns_message(source, to, subject, body):
    client = boto3.client("ses", region_name=REGION)
    response = client.send_email(
        Source=source,
        Destination={
            "ToAddresses": [to, ]
        },
        Message={
            "Subject": {
                "Data": subject,
            },
            "Body": {
                "Text": {
                    "Data": body,
                },
            }
        }
    )
    return response


def handler(event, context):
    try:
        records = event.get("Records")
        message = records[0]["Sns"]["Message"]
        subject = records[0]["Sns"]["Subject"]
        result = send_sns_message(
            FROM_EMAIL, TO_EMAIL, subject, message)
        return result
    except Exception as e:
        return str(e)
