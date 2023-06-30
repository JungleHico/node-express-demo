import express from 'express';
// https://github.com/HenningM/express-ws
import expressWs from 'express-ws';

const port = 3000;
const app = express();
const router = express.Router();
const ws = expressWs(app);
ws.applyTo(router);

router.ws('/test', (ws, req) => {
  console.log(`connected to ${req.ip}`);

  ws.send('This is a message from server.');

  ws.on('message', (data) => {
    console.log(data);
  });
});

app.use('/socket', router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
