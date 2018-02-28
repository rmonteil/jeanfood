import {NextFunction, Request, Response, Router} from "express";

class Api {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public getAll(req: Request, res: Response, next: NextFunction) {
    res.send("toto");
  }

  public init() {
    this.router.get("/", this.getAll);
  }

}

export default (new Api()).router;
