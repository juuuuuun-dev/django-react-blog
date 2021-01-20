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
        encode_body = json.loads(body)
        status_code = 200
        to_email = str(encode_body['email'])
        subject = str(encode_body['subject'])
        message = str(encode_body["message"])
        encode_body["send"] = sendmail(FROM_EMAIL, to_email, subject, message)
    except Exception as e:
        status_code = 500
        body = {"description": str(e)}

    return {
        'statusCode': status_code,
        "headers": {
            "Content-Type": "text/plain"
        },
        "body": json.dumps(encode_body)
    }
