import * as bodyParser from "body-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import ApiRouter from "./routes/Api";

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far.
     */
    const defaultRouter = express.Router();
    // placeholder route handler
    defaultRouter.get("/", (req, res, next) => {
      res.json({
        message: "Welcome to Jean-food!",
      });
    });
    this.express.use("/", defaultRouter);

    this.express.use("/api/", ApiRouter);
  }

}

export default new App().express;

// db.webhook.map((webhook: any) => {
//     schedule.scheduleJob(webhook.cron, () => {
//         place.getCoordinates(webhook.address)
//             .then((coordinates) => {
//                 place.getRestaurants(coordinates)
//                     .then((restaurants) => {
//                         const text = restaurants.map((restaurant: any) => {
//                             return `- ${restaurant.name} (${restaurant.rating}/5), ${restaurant.address}`;
//                         })
//                             .join("\n");

//                         mattermost.send({
//                             channel: "#" + webhook.channel,
//                             icon_url: webhook.bot.icon_url,
//                             text: "Here are a few nearby restaurants:\n"
//                                 + text
//                                 + "\nTough decision, right? :wink:",
//                             username: webhook.bot.username,
//                         });
//                     });
//             })
//             .catch((err: Error) => {
//                 console.error("An error happened:", err);
//             });
//     });
// });
