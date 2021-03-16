import * as express from 'express';
import Controller from './IController';

class App{
  public app: express.Application
  private port: number = 3535;
  
  constructor(controllers: Controller[]) {
    this.app = express();
    this.getControllerInstances(controllers);
  }

  public listen(){
    this.app.listen(this.port,()=>{
      console.info(`App listening on the port ${process.env.PORT}`)
    });
  }

  private getControllerInstances(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }


}

export default App;