const express = require("express");
const config = require("./config")
const tweetsRouter =  require("./routes/tweetsRouter");
const { logErrors, wrapErrors, errorHnadler } = require("./utils/middlewares/errorMiddlewares");

const app = express();
const port = config.port;

// Implementing Express MiddleWare to interprete json format if header Content-Type is json
app.use(express.json());

// Routes Middlewares
app.use("/tweets", tweetsRouter);


// Errors Middlewares
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHnadler)

app.listen(port, () => console.log(`🗺️ Server running at http://localhost:${port}`));

