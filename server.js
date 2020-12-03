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
/* 3.5 In the sync method, there is a configuration parameter { force: false }. 
If we change the value of the force property to true, then the database 
connection must sync with the model definitions and associations. By forcing 
the sync method to true, we will make the tables re-create if there are any 
association changes. This definition performs similarly to DROP TABLE IF EXISTS, 
which was used previously. This allows the table to be overwritten and re-created.

Dropping all the tables every time the application restarts is no longer necessary 
and in fact will constantly drop all the entries and seed data we enter, which can 
get very annoying. Think of this true/false force relationship as a reset button:
Do we need to update/sync the relationships? Force true to reset, otherwise false. */
sequelize.sync({force: false}).then(() => {
        app.listen(PORT, () => console.log("Now listening"));
});