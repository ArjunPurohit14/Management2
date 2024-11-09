const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const clientRoute = require('./routes/clients');
const subscriberRoute = require('./routes/subscriber');
const contactRoute = require('./routes/contact');
const projectsRoute = require('./routes/projects');
require('dotenv').config();

const app = express();

// Use CORS middleware


app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.startsWith('http://localhost')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());  // For parsing application/json

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use the projects route
app.use('/api/projects', projectsRoute);

// Use the clients route
app.use('/api/clients', clientRoute);

// Use the contact route  
app.use('/api/contact', contactRoute);

// Use the subscriber route
app.use('/api/subscribers', subscriberRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
