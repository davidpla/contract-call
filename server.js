const express = require('express');
const connectDB = require('./config/db');
 const router = require('./routes')
const path = require('path');
const cors = require('cors');
const app = express();

// Init Middleware
app.use(express.json());
app.use(cors());

app.use(router);





////////////////////////

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use, trying port ${port + 1}`);
      startServer(port + 1); // Try next available port
    } else {
      console.error(err);
    }
  });
}

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

startServer(PORT);
