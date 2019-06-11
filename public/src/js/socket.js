import '../scss/socket';

const message = io('http://localhost:8000');

$('#add-user').on('click', () => {
    let user = $('#user').val();
    localStorage.setItem('user', user);
    message.emit('joinRoom', { room: 'public', user: user });

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

function template(data) {
    return `
        <div class="row comments mb-2">
            <div class="col-md-2 col-sm-2 col-3 text-center user-img">
                <img id="profile-photo" src="http://nicesnippets.com/demo/man01.png" class="rounded-circle" />
            </div>
            <div class="col-md-9 col-sm-9 col-9 comment rounded mb-2">
                <h4 class="m-0"><a href="#">${data.name}</a></h4>
                <p class="mb-0 text-white">${data.message}</p>
            </div>
        </div>
    `

}