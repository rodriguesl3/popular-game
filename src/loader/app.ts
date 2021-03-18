import Express, { Application } from 'express';
import Controller from '../controllers/IController';

class App {
  public app: Application
  private port: number = 3535;

  constructor(controllers: Controller[]) {
    this.app = Express();
    this.getControllerInstances(controllers);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`App listening on the port ${this.port}`)
    });
  }

  private getControllerInstances(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }


}

export default App;