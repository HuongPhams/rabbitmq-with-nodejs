var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var q = 'task_queue_tungns';
        //var msg = ;//process.argv.slice(2).join(' ') || "Hello World!";

        var count = 0;
        

        ch.assertQueue(q, { durable: true });

        setInterval(function() {
        	++ count;
        	var msg = 'Nguyen Tung' + count;
            ch.sendToQueue(q, new Buffer(msg),{ persistent: true });
            console.log(" [x] Sent '%s'", msg);
        }, 2000);


        // ch.sendToQueue(q, new Buffer(msg), { persistent: true });
        // console.log(" [x] Sent '%s'", msg);
    });

});
