import App from "./loader/app"
import GameController from "./controllers/GameController";
import BoardService from "./services/BoardService";

const app = new App([
  new GameController(),
]);

app.listen();