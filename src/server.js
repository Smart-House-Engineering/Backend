import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
const port = process.env.PORT || 5000;

app.listen(port, async () => {
    console.log("Server listening on PORT " + port);
});
