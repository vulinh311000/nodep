import {pushSocketIdToArray,emitNotifyToArray,removeSocketIdFromArray} from "../../helpers/socketHelper";


export default function addNewContact(io) {
    let clients = {};
    io.on('connection', (socket) => {
        clients = pushSocketIdToArray(clients,socket.request.user._id,socket.id);

        socket.on('add-new-contact', (data) => {
            const currentUser = {
                id: socket.request.user._id,
                username: socket.request.user.username,
                avatar: socket.request.user.avatar
            };

            if(clients[data.contactId]) {
                emitNotifyToArray(clients,data.contactId,io,"response-add-new-contact",currentUser);
            }
        });

        socket.on('disconnect', () => {
            clients = removeSocketIdFromArray(clients,socket.request.user._id,socket);
        });
    });
};