const express = require("express");
const tweetsRouter =  require("./routes/tweetsRouter");

const app = express();
const port = 3000;

// Implementing Express MiddleWare to interprete json format if header Content-Type is json
app.use(express.json());

app.use("/tweets", tweetsRouter);

app.listen(port, () => console.log(`🗺️ Server running at http://localhost:${port}`));

