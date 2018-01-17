import * as express from "express";
const router = express.Router();

router.get("/address", (req, res) => {
    res.send("New address set!");
});

export default router;
