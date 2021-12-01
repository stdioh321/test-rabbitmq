var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        let queue = 'hello';
        channel.assertQueue(queue, {
            durable: false
        });


        [...Array(10).keys()].map(it => it + 1).forEach(it => {

            let msg = { msg: `Hello world: ${Math.round(Math.random()*99999)+1}` };
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
            console.log(" [x] Sent %s", msg);
        })

        setTimeout(function() {
            connection.close();
            process.exit(0);
        }, 2000);
    });



});