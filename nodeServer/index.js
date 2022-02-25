// NodeServer which will handel socket io connections.
const io = require("socket.io")(8000, {
    cors: {
        origin: "http://localhost:5500",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});
// const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket => {
    // If any user joins, let other users connected to the server know!
    socket.on('new-user-joined', name => {
        console.log('New User', name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // If someone send a message than broadcast it to other people.
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
   
    // If someone leaves a chat let others know.
    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
})

