#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);

if (args.length == 0) {
    console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
    process.exit(1);
}


function consoleLog(){
  console.log(arguments);
}

consoleLog(args);

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var ex = 'direct_logs';
        var count = 0;

        setInterval(function() {
            ++count;
            //var msg = 'Nguyen Tung' + count;
            ch.assertExchange(ex, 'direct', { durable: false });

            args.forEach(function(severity) {
              console.log('severity',severity);
              var msg = (severity === 'php') ? 'Hello PHP!' : (severity === 'java') ? 'Hello JAVA!' : 'Underfined';
                ch.publish(ex, severity, new Buffer(msg));
                console.log(" [x] Sent %s: '%s'", severity, msg);
            });
            
            
        }, 2000);
    });
});

