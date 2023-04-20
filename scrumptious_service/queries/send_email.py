import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')


def send_email(to_emails, subject, content):
    message = Mail(
        from_email='ScrumptiousTeam@hotmail.com',
        to_emails=to_emails,
        subject=subject,
        html_content=content
        )
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        return response.status_code == 202
    except Exception as e:
        # print(str(e))
        return False
