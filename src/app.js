const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');


const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));


app.use('/auth',authRoutes);
app.use('/events',eventRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))