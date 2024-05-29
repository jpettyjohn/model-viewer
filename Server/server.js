const express = require('express');
const { PORT } = require('./config/config.js');
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');

let app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
//app.use(express.static('wwwroot'));
app.use(require('./routes/auth.js'));
app.use(require('./routes/models.js'));
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Client/build")));
  }
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Client/build/index.html"));
  });
  
app.listen(PORT, function () { console.log(`Server listening on port ${PORT}...`); });
