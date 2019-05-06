var message = io('http://localhost:8000');


$('#add-user').on('click', () => {
    let user = $('#user').val();
    localStorage.setItem('user', user);
    message.emit('joinRoom', { room: 'private', user: user });

});

$('#send').on('click', () => {
    let newMessage = $('#message').val();
    let user = localStorage.getItem('user');
    message.emit('sendMessage', { room: 'private', user: user,  message: newMessage });
});

message.on('roomJoined', (data) => {
    $('#notification').append(`<p>${data}</p>`)
});


message.on('messageReceived', (data) => {
    console.log(data);
    $('#notification').append(`<p>${data.user}: ${data.message}</p>`)
});

message.on('joinError', (data) => {
    console.log(data);
});
