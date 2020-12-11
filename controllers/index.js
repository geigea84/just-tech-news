//1.6 collect the packaged API routes

/* 1.6 Much like the API folder's index.js file that 
collects the endpoints and prefixes them, here we are 
collecting the packaged group of API endpoints and 
prefixing them with the path /api. Also, note that 
second use of router.use(). This is so if we make a 
request to any endpoint that doesn't exist, we'll 
receive a 404 error indicating we have requested an 
incorrect resource, another RESTful API practice.

Now when we import the routes to server.js, they'll 
already be packaged and ready to go with this one file. */

const router     = require("express").Router();
const apiRoutes  = require("./api");

//14.1.4
const homeRoutes = require("./home-routes.js");
router.use("/", homeRoutes);

router.use("/api", apiRoutes);
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;