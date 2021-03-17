import App from "./loader/app";
import GameController from "./controllers/GameController";

const app = new App([
  new GameController(),
]);

app.listen();