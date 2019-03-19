require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const sharedsession = require('express-socket.io-session');

const models = require('./models');
const redisStore = require('./config/redis')(session);
const response = require('./utils/response');

require('./config/passport')(passport);

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const sess = session({
  resave: false,
  saveUninitialized: false,
  secret: 'IECSE',
  store: redisStore,
  cookie: { maxAge: 604800000 }
});

app.use(sess);
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser('IECSE'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(response);
io.use(sharedsession(sess));

io.on('connection', socket => {
  try {
    if (!socket.handshake.session.passport.user) {
      console.log('disconnecting socket connection');
      socket.disconnect(true);
    }
  } catch (err) {
    console.log('disconnecting socket connection');
    socket.disconnect(true);
  }
});

app.use('/api', require('./routes')(passport, io));

const port = process.env.PORT || 3000;

start(1);

function start(i) {
  if (i > 10) return console.log('Could not sync models');
  models.sequelize.sync().then(
    () => {
      server.listen(port, err => {
        console.log(err || 'Listening on port ' + port);
      });
    },
    err => {
      console.log(`DB connection trial ${i}:`, err.message);
      setTimeout(() => start(i + 1), 20000);
    }
  );
}
