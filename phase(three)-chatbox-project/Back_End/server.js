const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const mongo = require('mongodb').MongoClient;
const moment = require('moment');
const formatMessage = require('../Front_End/js/messages');
const { userJoin, userLeave, getCurrentUser, getRoomUsers, getCurrentUserId } = require('../Front_End/js/users');
const PORTNUMBER = process.env.PORT || 9090;
const name = 'Chatbox ';

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketio(server);


// set static folder
app.use(express.static(path.join(__dirname, '../Front_End')));


// Get username and room from the url (get method)
app.get("/chatbox", (req, res) => {
    res.sendFile(path.resolve('./Front_End/chatbox.html'));
    // let username = req.query["username"];
    // let room = req.query["room"];
    // console.log(username, room);
});

// mongodb part
const mongoURL = 'mongodb://127.0.0.1/chats';
mongo.connect(mongoURL, function (err, client) {

    if (err) {
        throw err;
    }
    console.log('Connected to mongodb ..');
    let chats = client.db('chats');

    // run when client connects (connect to socket.io)
    // open bidirectional communication 
    io.on('connection', socket => {
        let messageArray = [];

        socket.on('joinRoom', ({ username, room }) => {

            // socket part to handle new user who joined the room
            const user = userJoin(socket.id, username, room);
            socket.join(user.room);

            // mongodb part to save user data into the db
            let content = { chatId: socket.id, username: user.username, room: user.room, message: {}, joinedDate: moment().format('h:mm a') };
            chats.collection('messages').insertOne(content, (err, result) => {
                if (!err) {
                    console.log(result);
                } else {
                    console.log(err)
                }
                // client.close();
            });

            // emit to single client
            socket.emit('message', formatMessage(name, 'Welcome to chatbox!'));

            // broadcast when user connects
            // emit to everyone except for the connected user
            socket.broadcast.to(user.room).emit('message', formatMessage(user.username, `${user.username} has joined the chat`));

            // send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        });

        // Listen for chat messages in specific room
        socket.on('chatMessage', msg => {

            const user = getCurrentUser(socket.id);
            const userID = getCurrentUserId(socket.id, user.username);

            // update the message content for specifc users
            if (userID == socket.id) {
                messageArray.push({ content: msg, date: moment().format('h:mm a') });
                chats.collection('messages').updateOne({ chatId: userID }, { $set: { message: messageArray } });
                io.to(user.room).emit('message', formatMessage(user.username, msg));
            }
        });

        // runs when the user disconnects from specific room
        socket.on('disconnect', () => {

            const user = userLeave(socket.id);
            if (user) {
                io.to(user.room).emit('message', formatMessage(name, `${user.username} has left the chat`));
            }
        });
    });
});


server.listen(PORTNUMBER, () => console.log(`Server is running on: ${PORTNUMBER}`));



