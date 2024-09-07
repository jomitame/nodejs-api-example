const express = require("express");
const config = require("./config")
const tweetsRouter =  require("./routes/tweetsRouter");

const app = express();
const port = config.port;

// Implementing Express MiddleWare to interprete json format if header Content-Type is json
app.use(express.json());

app.use("/tweets", tweetsRouter);

app.listen(port, () => console.log(`🗺️ Server running at http://localhost:${port}`));

