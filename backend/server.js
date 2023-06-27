const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const http = require('http');
const socketIO = require('socket.io');
const socketHandler = require('./socket');


// Import your route files
const authRoutes = require('./routes/authRoutes');
const conferenceRoutes = require('./routes/conferenceRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to the database
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


// Use your route files
app.use('/api/auth', authRoutes);
app.use('/api/conference', conferenceRoutes);

const server = http.createServer(app);
const io = socketIO(server);

// Socket.io logic
socketHandler(io);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
