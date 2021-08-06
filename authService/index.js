const express = require("express")
const app = express()
const amqp = require("amqplib")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var channel, connection

connect();

async function connect(){
    try{
        const amqpServer = "amqp://localhost:5672"
        connection = await amqp.connect(amqpServer)
        channel = await connection.createChannel()
    
        // ;(await channel).assertQueue
        await channel.assertQueue("rabbit")
    }catch(err){
        console.log(err)
    }
}

// const app = express();

const auth = {
    "email" : "aaa@example.com",
    "password" : "password"
}

app.get('/send', async (req, res)=>{
    const data = {
        "name": "Ali",
        "email": "ali@yahoo.com"
    }

    try {
        await channel.sendToQueue("rabbit", Buffer.from(JSON.stringify(data)))
        await channel.close()
        await connection.close()
        res.status(200).send("done here");  
    } catch (error) {
        
    }
});

app.post('/sms', async (req, res)=>{
    try {
        var email = req.body.email
        var password = req.body.password
        var message = req.body.message
    
        if(email == auth.email && password == auth.password){
            // res.send("hi")
    
            await channel.sendToQueue("rabbit", Buffer.from(JSON.stringify(req.body)))
            // await channel.close()
            // await connection.close()
            res.status(200).send("Valid authentication details, processing sms");
        }else{
            res.status(400).send("Invalid login credentials provided")
        }
    } catch (error) {
        console.log(error)
    }
})
app.listen(500, ()=>{
    console.log('server at port 500') 
})