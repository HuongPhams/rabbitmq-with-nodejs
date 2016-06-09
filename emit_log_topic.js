#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var ex = 'topic_logs', count = 0;
        var args = process.argv.slice(2);
        var key = (args.length > 0) ? args[0] : 'anonymous.info';
        var msg = args.slice(1).join(' ') || 'Hello World!';

        consoleLog(key, msg);

        ch.assertExchange(ex, 'topic', { durable: false });

        setInterval(function() {
            ++count;
            //var msg = 'Nguyen Tung' + count;
            
            ch.publish(ex, key, new Buffer(msg));
            console.log(" [x] Sent %s:'%s'", key, msg);
        }, 2000);
    });


});

function consoleLog(){
  console.log(arguments);
}
