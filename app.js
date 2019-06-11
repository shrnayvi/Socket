const express       = require('express');
const bodyParser    = require('body-parser');

var app             = express();

app.use('/static', express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', (req, res) => {
    res.render('index');
});
app.use(express.static(__dirname + '/../public'));

app.use(bodyParser.urlencoded({limit : '500kb','extended': 'true'}));
app.use(bodyParser.json({limit : '500kb'}));


const server = app.listen(8000, () => {
    console.log(`listening to port 8000`);
});

const io = require('socket.io')(server);

const roomList = ['public'];
io.on('connection', (socket) => {
    socket.on('joinRoom', (data) => {
        let room = data.room;
        if(roomList.includes(room) ) {
            socket.join(room);
            socket.broadcast.to(room)
                .emit('roomJoined', `${data.user} joined the room`);
        } else {
            socket.emit('joinError', 'Room not available');
        }
    });

    socket.on('sendMessage', (data) => {
        io.to(data.room).emit('messageReceived', data);
    });
});
