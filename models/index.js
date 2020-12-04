/* 1.5 All this file is responsible for right now is importing the User model and exporting an object with it as a property. 
It seems unnecessary at the moment, but doing this now will set us up for future growth of the application. */

//3.4 added Post const and export
//4.3 added Vote const and export
//5.3 added Comment const and export

const User    = require("./User");
const Post    = require("./Post");
const Vote    = require("./Vote");
const Comment = require("./Comment");

//3.5 create association
User.hasMany(Post, {
    foreignKey: "user_id"
});

//3.5 create reverse association
Post.belongsTo(User, {
    foreignKey: "user_id"
});
/* Implication that's being made with the associations:
The User can have many Posts, but each Post can only
have one User. */

//4.3
User.belongsToMany(Post, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "user_id"
});

Post.belongsToMany(User, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "post_id"
});
/* With these two .belongsToMany() methods in place, 
we're allowing both the User and Post models to query 
each other's information in the context of a vote. If 
we want to see which users voted on a single post, we 
can now do that. If we want to see which posts a single 
user voted on, we can see that too. 

Notice the syntax. We instruct the application that the 
User and Post models will be connected, but in this case 
through the Vote model. We state what we want the foreign 
key to be in Vote, which aligns with the fields we set up 
in the model. We also stipulate that the name of the Vote 
model should be displayed as voted_posts when queried on, 
making it a little more informative.

Furthermore, the Vote table needs a row of data to be a 
unique pairing so that it knows which data to pull in when 
queried on. So because the user_id and post_id pairings must 
be unique, we're protected from the possibility of a single 
user voting on one post multiple times.*/

//4.3
Vote.belongsTo(User, {
    foreignKey: "user_id"
});

Vote.belongsTo(Post, {
    foreignKey: "post_id"
});

User.hasMany(Vote, {
    foreignKey: "user_id"
});

Post.hasMany(Vote, {
    foreignKey: "post_id"
});

//5.3
Comment.belongsTo(User, {
    foreignKey: "user_id"
});

Comment.belongsTo(Post, {
    foreignKey: "post_id"
});

User.hasMany(Comment, {
    foreignKey: "user_id"
});

Post.hasMany(Comment, {
    foreignKey: "post_id"
});
/* Note that we don't have to specify Comment as a through 
table like we did for Vote (ln 28, 34). This is because we 
don't need to access Post through Comment; we just want to 
see the user's comment and which post it was for. */

module.exports = {User, Post, Vote, Comment};