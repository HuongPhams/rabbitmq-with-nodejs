#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var ex = 'logs-tungns';
        var count = 0;
        //var msg = process.argv.slice(2).join(' ') || 'Hello World!';

        // ch.assertExchange(ex, 'fanout', { durable: false });
        // ch.publish(ex, '', new Buffer(msg));
        // console.log(" [x] Sent %s", msg);

        setInterval(function() {
            ++count;
            var msg = 'Nguyen Tung' + count;
            ch.assertExchange(ex, 'fanout', { durable: false });
            ch.publish(ex, '', new Buffer(msg));
            console.log(" [x] Sent %s", msg);
        }, 2000);
    });

    // setTimeout(function() { conn.close();
    //     process.exit(0) }, 500);
});
