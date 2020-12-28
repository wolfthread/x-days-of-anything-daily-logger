const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

const app = express();

var dotenv = require('dotenv');
dotenv.config();

// connect database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xssClean());

// Prevent http param pollution
app.use(hpp());

// Rate Limiting
const limiter = rateLimit({
  windowMS: 10 * 60 * 1000, // 10 minutes
  max: 100,
});

app.use(limiter);

app.get('/', (req, res) => res.send('API running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/dailylog', require('./routes/api/dailylog'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
