const express = require('express');
const server = express();

server.get('/', (req, res) => res.send('Hello world'));

server.listen(3000);
console.log('Server is listening in port 3000...');