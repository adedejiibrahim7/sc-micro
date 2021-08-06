const express = require("express")
const app = express()
const amqp = require("amqplib")

const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const service = twilio.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);

//The array of 2000 numbers. This can be gotten from a database
var numbers = ['+2348102939948', '+2348093847589']; //Just a representation

const bindings = numbers.map(number => {
    return JSON.stringify({ binding_type: 'sms', address: number });
  });

var channel, connection

connect()

async function connect(){
    try{
        const amqpServer = "amqp://localhost:5672"
        connection = await amqp.connect(amqpServer)
        channel = await connection.createChannel()
    
        await channel.assertQueue("rabbit")

        channel.consume("rabbit", data => {

            var obj = JSON.parse(data.content)
            // console.log(obj.messageBody)

            var body = `Message From: ${obj.email}: ${obj.messageBody}`

            service.notifications
            .create({
                    toBinding: bindings,
                    body: body
            })
            .then(notification => {
                    console.log(notification);
            })
            .catch(err => {
                    console.error(err);
  });

            channel.ack(data)
        })
    }catch(err){
        console.log(err)
        throw ErrorEvent
    }
}

// const app = express();

// app.get('/send', (req, res)=>{

// });

app.listen(501, ()=>{
    console.log('server at port 501') 
})