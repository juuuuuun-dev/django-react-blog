import json
import os

import boto3

FROM_EMAIL = os.environ['FROM_EMAIL_ADDRESS']
REGION = os.environ['REGION']


def sendmail(source, to, subject, body):
    client = boto3.client("ses", region_name=REGION)
    response = client.send_email(
        Source=source,
        Destination={
            'ToAddresses': [to, ]
        },
        Message={
            'Subject': {
                'Data': subject,
            },
            'Body': {
                'Html': {
                    'Data': body,
                },
            }
        }
    )
    return response


def handler(event, context):
    try:
        body = event.get("body")
        status_code = 200
        TO_EMAIL = FROM_EMAIL
        subject = "error accoured"
        message = """
<br />
<br />
<a href="http://localhost:3010/password-reset-confirm/1/agm3nu-ef22242c328fcc51950911745e484877">http://localhost:3010/password-reset-confirm/1/agm3nu-ef22242c328fcc51950911745e484877</a>
<br />
<br />
from Django and React blog
"""
        body["result"] = sendmail(FROM_EMAIL, TO_EMAIL, subject, message)
    except Exception:
        status_code = 500
        body = {"description": str(Exception)}

    return {
        'statusCode': status_code,
        "headers": {
            "Content-Type": "text/plain"
        },
        "body": json.dumps(body)
    }
