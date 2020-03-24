const express = require('express');
const bodyParser = require('body-parser');
const ownerRouter = require('./routes/routes');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', ownerRouter);

const database = require('./configs/database');
mongoose.connect(database.dbStr, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.connection.on('error', err => console.log(err));

app.listen(3000, () => console.log('Uplife Reward Server start on port 3000!'))
