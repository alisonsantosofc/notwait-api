import express, { json } from 'express';

import './database';

const app = express();

app.use(express.json());

app.listen(9000, () => {
  console.log('✅️ Server started successfully on http://localhost:9000');
});
