var http = require('http');
var fs = require('fs');
var path = require('path');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
  socket.emit('connect_message', 'Veuillez renseigner un pseudo');
  socket.on('create_block', function (message) {
    socket.broadcast.emit('created_block',message);
  });
  socket.on('login', function (message) {
    socket.userName = message
    console.log(message+' est connecté !');
    socket.broadcast.emit('new_user',message);
  });
  socket.on('update_pos', function (message) {
    socket.broadcast.emit('user_moove',message);
  });
  socket.on('disconnect', function(){
    socket.broadcast.emit('user_quit',socket.userName);
  });
});



server.listen(80,'gamesocket.dunarr.com');
