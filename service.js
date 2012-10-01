var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , SerialPort  = require('serialport2').SerialPort
  , portName = 'COM6';

server.listen(2203);

var sp = new SerialPort();
sp.open(portName, {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

io.sockets.on('connection', function (socket) {

    socket.on('message', function (msg) {
        console.log(msg);
    });

    socket.on('disconnect', function () {
        console.log('disconnected');
    });
});

var readData = '';
sp.on('data', function (data) {
    readData += data.toString();

    if (readData.indexOf('PRESSED') >= 0) {

        console.log('PRESSED');
        readData = '';
        io.sockets.emit('message', 'PRESSED');
    }
});
