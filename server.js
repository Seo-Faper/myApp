var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log('Server On.');
app.get('/',function(req, res){
  res.sendFile(__dirname + '/public/main.html');
});
app.get('/chat',function(req,res){
        res.sendFile(__dirname+ '/public/index.html');
    });
io.sockets.on('connection',function(socket){
    connections.push(socket);
    console.log('[Connected]:%s sockets connected',connections.length);

    //Disconnect
    socket.on('disconnect',function(data){
      users.splice(users.indexOf(socket.username),1);
      updateUsernames();
      connections.splice(connections.indexOf(socket),1);
      console.log('[Disconnect]:%s sockets disconnect',connections.length);
    });

    //Send message
    socket.on('send message',function(data){
      io.sockets.emit('new message',{msg:data, user:socket.username});
    });

    //New user
    socket.on('new user',function(data,callback){
      console.log('!');
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    });

    function updateUsernames(){
      io.sockets.emit('get users', users);
    }

});
