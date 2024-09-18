const express = require("express");
const config = require("./config")
const tweetsRouter =  require("./routes/tweetsRouter");
const { 
    logErrors,
    wrapErrors,
    errorHnadler
} = require("./utils/middlewares/errorMiddlewares");
const notFound = require("./utils/middlewares/notFoundMiddleware");

const app = express();
const port = config.port;

// Implementing Express MiddleWare to interprete json format if header Content-Type is json
app.use(express.json());

// Routes Middlewares
//app.use("/tweets", tweetsRouter);
tweetsRouter(app);

// Catch 404
app.use(notFound);


// Errors Middlewares
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHnadler)

app.listen(port, () => console.log(`🗺️ Server running at http://localhost:${port}`));

