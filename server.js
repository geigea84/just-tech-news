//1.6

const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//turn on routes (connects to const defined on line 4)
app.use(routes);

//turn on connection to db and server (connects to const defined on line 5)
sequelize.sync({force: false}).then(() => {
        app.listen(PORT, () => console.log("Now listening"));
});