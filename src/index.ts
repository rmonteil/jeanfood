import logger from "./logger";
const log = logger();
import fetch from "node-fetch";
import * as Mattermost from "node-mattermost";
import * as schedule from "node-schedule";
import db from "./config/db";
import params from "./config/parameters";
import Place from "./place";
const place = new Place();
const mattermost = new Mattermost("https://chat.allo-media.net/hooks/nice34je93nxxnwhfowa3gxzno");

import * as express from "express";
import api from "./api";
const app = express();

app.use("/api", api);
app.listen(params.listening_port, () => console.log("Server is listening on port 3000"));

db.webhook.map((webhook) => {
    schedule.scheduleJob(webhook.cron, () => {
        place.getCoordinates(webhook.address)
            .then((coordinates) => {
                place.getRestaurants(coordinates)
                    .then((restaurants) => {
                        const text = restaurants.map((restaurant: any) => {
                            return `- ${restaurant.name} (${restaurant.rating}/5), ${restaurant.address}`;
                        })
                        .join("\n");

                        mattermost.send({
                            channel: "#" + webhook.channel,
                            icon_url: webhook.bot.icon_url,
                            text: "Here are a few nearby restaurants:\n"
                                + text
                                + "\nTough decision, right? :wink:",
                            username: webhook.bot.username,
                        });
                    });
            })
            .catch((err: Error) => {
                console.error("An error happened:", err);
            });
    });
});
