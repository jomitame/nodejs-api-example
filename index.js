const express = require("express");
const tweetsRouter =  require("./routes/tweetsRouter");

const app = express();
const port = 3000;

app.use("/tweets", tweetsRouter);

app.listen(port, () => console.log(`🗺️ Server running at http://localhost:${port}`));

