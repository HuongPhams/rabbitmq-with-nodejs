var amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var q = 'tungns1';
        var count = 0;
        var msg = 'Nguyen Tung';
        ch.assertQueue(q, { durable: false });
        setInterval(function() {
        	++ count;
            ch.sendToQueue(q, new Buffer(msg + count));
            console.log(" [x] Sent "+ msg + count);
        }, 2000);

    });
});
