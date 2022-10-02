import { io } from "socket.io-client";

const socketIo = io.connect('http://localhost:5000');

export default socketIo;
