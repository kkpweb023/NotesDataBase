const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
require('./DataBase/config');
const port = process.env.PORT || 4000 ;









app.listen(port, () => {
    console.log(`from port ${port}`)

})