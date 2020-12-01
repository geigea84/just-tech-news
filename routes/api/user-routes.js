const router = require("express").Router();
const {User} = require("../../models");

//Sequelize methods used
//.findAll()
//.findOne()
//.create()
//.update()
//.destroy()

/* 1.6 As mentioned before, the User model inherits functionality 
from the Sequelize Model class. .findAll() is one of the Model 
class's methods. The .findAll() method lets us query all of the 
users from the user table in the database, and is the JavaScript 
equivalent of the following SQL query: SELECT * FROM users; */

//Get /api/users
router.get("/", (req, res) => {
    //access our User model and run .findAll() method
    //1.6 edit attributes to exclude password
    User.findAll({
        attributes: {exclude: ["password"]}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

/* 1.6 This one is a little different from the .findAll() method 
in that we're indicating that we only want one piece of data back. 
Also, we're actually passing an argument into the .findOne() method, 
another great benefit of using Sequelize. Instead of writing a hefty 
SQL query, we can use JavaScript objects to help configure the query!

In this case, we're using the where option to indicate we want to 
find a user where its id value equals whatever req.params.id is, 
much like the following SQL query: SELECT * FROM users WHERE id = 1 */

//GET /api/users/1
router.get("/:id", (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

/* 1.6 To insert data, we can use Sequelize's .create() method. 
Pass in key/value pairs where the keys are what we defined in the 
User model and the values are what we get from req.body. In SQL, 
this command would look like the following code:

INSERT INTO users
  (username, email, password)
VALUES
  ("Lernantino", "lernantino@gmail.com", "password1234"); */

//POST /api/users
router.post("/", (req, res) => {
    //expects {username: "string", email: "string", password: "string"}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

/* 1.6 This .update() method combines the parameters for creating 
data and looking up data. We pass in req.body to provide the new 
data we want to use in the update and req.params.id to indicate 
where exactly we want that new data to be used.

The associated SQL syntax would look like the following code:

UPDATE users
SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234"
WHERE id = 1; */

//PUT /api/users/1
router.put("/:id", (req, res) => {
    //expects {username: "string", email: "string", password: "string"}
    //if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

/* 1.6 To delete data, use the .destroy() method and provide 
some type of identifier to indicate where exactly we would 
like to delete data from the user database table. */

//DELETE /api/users/1
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;