import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')


def send_email(to_emails):
    message = Mail(
        from_email='ScrumptiousTeam@hotmail.com',
        to_emails=to_emails,
        subject="You are added into a stickyboard/sticky!",
        html_content="Please login to check.")
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        return response.status_code == 202
    except Exception as e:
        # print(str(e))
        return False
