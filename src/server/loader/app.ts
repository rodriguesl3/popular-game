import cors from 'cors';
import Express, { Application } from 'express';
import Controller from '../controllers/IController';

class App {
  public app: Application
  private port: number = 3535;

  constructor(controllers: Controller[]) {
    this.app = Express();
    this.initCors();
    this.getControllerInstances(controllers);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`App listening on the port ${this.port}`)
    });
  }


  private initCors(){
    const options: cors.CorsOptions = {
      allowedHeaders: [
        'Origin',
        'Content-Type',
        'Accept',
      ],
      methods: 'GET,PUT,POST',
      origin: '*'
    }
    this.app.use(cors(options));
  }

  private getControllerInstances(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
}

export default App;