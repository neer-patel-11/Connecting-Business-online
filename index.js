
const path = require('path');
// connecting to atlas Mongo

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://businerashop:8Gb7dLE6MK2vf7ET@cluster0.logjhxd.mongodb.net/Businera?retryWrites=true&w=majority");


// requiring express

const app = require('express')();
// =============================
const Chat = require('./models/chatModel');
const http = require('http').Server(app);
// using userRoute to access the userRoutes.js file
const userRoute = require('./routes/userRoutes')

app.use('/', userRoute);


// using userRoute to access the generalRoute.js file
const generalRoute = require('./routes/generalRoutes')
const user = require('./models/userModel');
app.use('/', generalRoute);
// ===============================



const io = require('socket.io')(http);
var usnsp = io.of('/user-namespace');
usnsp.on('connection', async function(socket) {
  console.log('user connected');
  var userid = socket.handshake.auth.token;
  console.log(userid);
  await user.findByIdAndUpdate({ _id: userid }, { $set: { is_online: true } });
  socket.broadcast.emit('getOnlineUser', { user_id: userid })    // broadcasting the connected user using event
  socket.on('disconnect', async function() {
    var userid = socket.handshake.auth.token;
    await user.findByIdAndUpdate({ _id: userid }, { $set: { is_online: false } });
    console.log('user disconnected');
    socket.broadcast.emit('getOfflineUser', { user_id: userid })    // broadcasting the disconnected user using event
  });
  // recieving messages
  socket.on('newChat', function(data) {
    socket.broadcast.emit('loadNewChat', data);
  })

  //loading older/existing chats
  socket.on('existingChatLoad', async function(data) {
    var olderchats = await Chat.find({
      $or: [
        { sender_id: data.sender_id, receiver_id: data.receiver_id },
        { sender_id: data.receiver_id, receiver_id: data.sender_id },
      ]
    });

    socket.emit('loadChats', { chats: olderchats });

  })
});

// listening on port 5000
const PORT = process.env.PORT || 3000
http.listen(PORT, function() {
  console.log("server running at port " + PORT);
});
// ===============================