// env
require('dotenv').config();

// server
const server = require('./api/server');

const PORT = process.env.PORT || 4700;

server.listen(process.env.PORT, () => console.log(`\n===*Server running on port ${PORT}*===\n`));
