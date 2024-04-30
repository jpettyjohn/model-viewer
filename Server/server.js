const express = require('express');
const PORT = process.env.PORT || 3001;

let app = express();
app.use(express.static('wwwroot'));
app.use(require('./routes/auth.js'));
app.listen(PORT, function () { console.log(`Server listening on port ${PORT}...`); });