# sc-micro
A small node micro-service projects that demonstrates sending sms to 2000 phone numbers

It consists of two services:authService and smsService. The authService has a "Post: /sms" service that expects email, password and messageBody.
It validates if the email == aaa@example.com and password == "password". If true, it sends a message to the smsService through a "rabbit" chanel,
which then uses twilio (notify service) to send an sms consisting of the sender's email address and the messageBody to the array of 2000 numbers

THIS PROJECT IS MERELY A DEMONSTRATIVE ONE, and its purpose is to play around with microservices
