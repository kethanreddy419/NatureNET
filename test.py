import smtplib
from email.message import EmailMessage

# configuration
subject = ""
body = ""
phone_number = "2816671966"
email = "jaejin0109@gmail.com"

CARRIERS = {
    "att": "@txt.att.net",
    "tmobile": "@tmomail.net",
    "verizon": "@vtext.com",
    "sprint": "@messaging.sprintpcs.com"
}


def send_alert(subject, body, to):
    user = "naturenet.alert@gmail.com"
    password = "yqic pftp vhsk iylx"
    
    msg = EmailMessage()
    msg.set_content(body)
    msg['subject'] = subject
    msg['to'] = to
    msg['from'] = user
    
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(user, password)
    server.send_message(msg)

    server.quit()

if __name__ == '__main__':
    
    # message alert
    for key in CARRIERS:
        carrier = CARRIERS[key]
        send_alert(subject, body, phone_number + carrier)

    # email alert
    send_alert(subject, body, email)