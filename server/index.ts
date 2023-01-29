import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Movies App');
});

app.listen(4500, () => {
  console.log('Server started on http://localhost:4500');
});
