const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/');
const FakeDb = require('./fake-db');
// const commentRoutes = require ('./routes/comments');
const app = express();
app.use(bodyParser.json());

const httpServer = require('http').createServer(express);

//socket.ioのインスタンス作成
const io = require('socket.io')(httpServer, {
  cors: true,
  origins: ["*"]
});

//クライアントから接続があった時
io.on('connection', (socket) => {
  console.log('A user connected!');
  // mongoose.connect(config.DB_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useCreateIndex: true
  // }).then(
  //   () => {
  //     if(process.env.NODE_ENV !== 'production') {
  //       const fakeDb = new FakeDb();
  //       // fakeDb.initDb();
  //     }
  //   }
  // );
  // if(process.env.NODE_ENV === 'production') {
  //   const appPath = path.join( __dirname, '..', 'dist', 'reservation-app');
  //   app.use(express.static(appPath));
  //   app.get('*', function(req, res) {
  //     res.sendFile(path.resolve(appPath, 'index.html'));
  //   });
  // }
  socket.on('sendMessage', (message) => {
    console.log('You have got a message!' + message);
  })
})

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => console.log('Express server listening on port ' + PORT));
