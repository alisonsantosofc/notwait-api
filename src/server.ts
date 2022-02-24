import express from 'express';
import 'reflect-metadata';

import routes from './routes';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(9000, () => {
  console.log('✅️ Server started successfully on http://localhost:9000');
});
