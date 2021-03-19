import App from "./server/loader/app"
import GameController from "./server/controllers/GameController";
import BoardService from "./server/services/BoardService";

const app = new App([
  new GameController(),
]);

app.listen();