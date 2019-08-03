export default function addNewContact(io) {
    io.on('connection', (socket) => {
        socket.on('add-new-contact',(data) => {
            console.log(data);
            console.log('socket.request.user',socket.request.user);
        });
    });
};