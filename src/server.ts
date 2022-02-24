import express from 'express';

const app = express();

app.listen(9000, () => {
  console.log('✅️ Server started successfully on http://localhost:9000');
});
