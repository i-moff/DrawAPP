exports = module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('mousemove', function (data) {
            socket.broadcast.emit('moving', data);
            console.log(data);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};