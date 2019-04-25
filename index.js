// env
require('dotenv').config();

// server
const server = require('./api/server');

const PORT = process.env.PORT || 9090;

server.listen(port, () => console.log(`\n===*Server running on port ${port}*===\n`));
