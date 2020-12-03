//3.6
const router = require("express").Router();
const {User, Post, Vote} = require("../../models");

//4.4
const sequelize = require("../../config/connection");

//get all posts
router.get("/", (req, res) => {
    console.log("======================");
    Post.findAll({
        attributes: [
            "id", 
            "post_url", 
            "title", 
            "created_at",
            [sequelize.literal("(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)"), "vote_count"]
        ],
        //3.6 added order
        order: [["created_at", "DESC"]],
        //array because more than one join may be necessary
        include: [
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get a single post
router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id", 
            "post_url", 
            "title", 
            "created_at",
            [sequelize.literal("(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)"), "vote_count"]
        ],
        include: [
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: "No post found with this id"});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//create a post
router.post("/", (req, res) => {
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//4.4 PUT /api/posts/upvote
router.put("/upvote", (req, res) => {
    //4.6 update
    //custom static method created in models/Post.js
    Post.upvote(req.body, {Vote})
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
    
});
/* Instead of trying to predict and build a method for 
every possible use developers have for SQL databases, 
Sequelize provides us with a special method called 
.literal() that allows us to run regular SQL queries 
from within the Sequelize method-based queries. So when 
we vote on a post, we'll see that post—and its updated 
vote total—in the response. */

//update a post's title
router.put("/:id", (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: "No post found with this id"});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//delete a post
router.delete("/:id", (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: "No post found with this id"});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;