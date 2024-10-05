const express = require('express');
const app = express();
const PORT = 13000;

// sample of a route
app.get('/', (req, res) => res.send('<h1>Hello World</h1>'));

app.listen(PORT, console.log('Server is running on port: ' + PORT));
