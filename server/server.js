const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const os = require("os");

const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

const db = require("./models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("DB re-synced");
});

app.get("/", (req,res) => {
    res.json({
        server_status: "running",
        host_info: os.cpus(),
        free_mem: os.freemem()
    });
});

require("./routes/questionnaire.routes")(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});
