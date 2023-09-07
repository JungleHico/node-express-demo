import express from 'express';
import expressWs from 'express-ws';

export default function useWebSocketRouter(app, path) {
  const webSocketRouter = express.Router();
  const ws = expressWs(app);
  ws.applyTo(webSocketRouter);

  webSocketRouter.ws('/', (ws, req) => {
    console.log(`connected to ${req.ip}`);

    ws.send('This is a message from server.');

    ws.on('message', (data) => {
      console.log(data);
    });
  });

  app.use(path, webSocketRouter);
}
