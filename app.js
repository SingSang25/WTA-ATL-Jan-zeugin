import dotenv from 'dotenv';
import server from './server.js';
import database from './database/index.js';

dotenv.config();

const port = 3000;

await database.connect();

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
