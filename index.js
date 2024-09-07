const connection = require("./lib/connect");
const express = require("express");

const app = express();
const port = 3000;
const statusOK = 200;
const statusError = 500;

function getTeewts() {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT * FROM tweets";
        connection.query(sqlQuery, (error, results) => {
            if (error){
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
}

app.get("/tweets", async (req, res) => {
    try {
        const teewts = await getTeewts();
        res.status(statusOK).json(teewts);    
    } catch (error) {
        res.status(statusError).json({ error: error.message });
    }
    
});

app.listen(port, () => console.log(`🗺️ Server running at http://localhost:${port}`));

