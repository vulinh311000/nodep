import addNewContact from './contact/addNewContact';
import removeRequestContact from './contact/removeRequestContact';

const initSockets = (io) => {
    addNewContact(io);
    removeRequestContact(io);
};

export default initSockets;
