//1.6
const express   = require("express");
const routes    = require("./controllers");
const sequelize = require("./config/connection");

//14.1.3
const path      = require("path");
//14.1.4
const exphbs    = require("express-handlebars");
const hbs       = exphbs.create({});

const app       = express();
const PORT      = process.env.PORT || 3001;

//14.2.5 
const session        = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
        secret: "Super secret secret",
        cookie: {},
        resave: false,
        saveUninitialized: true,
        store: new SequelizeStore({
            db: sequelize
        })
    };
    
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//14.1.3
/* The express.static() method is a built-in Express.js 
middleware function that can take all of the contents of 
a folder and serve them as static assets. This is useful 
for front-end specific files like images, style sheets, 
and JavaScript files. */
app.use(express.static(path.join(__dirname, "public")));
//14.1.4
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

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