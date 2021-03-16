import App from "./app";
import GameController from "./GameController";

const app = new App([
  new GameController(),
]);

app.listen();