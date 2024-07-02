const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); // Assuming this connects to MongoDB

// Load environment variables from config file
dotenv.config({ path: './config/config.env' });

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use(morgan('dev'));

// Routes
app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/inventory', require('./routes/inventoryRoutes'));
app.use('/api/v1/analytics', require('./routes/analyticsRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, './client/build')));

// Example route to serve static HTML file
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Blood Bank Server is Running in ${process.env.DEV_MODE} Mode on PORT ${PORT}.`.bgYellow.black);
});
