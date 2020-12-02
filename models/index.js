/* 1.5 All this file is responsible for right now is importing the User model and exporting an object with it as a property. 
It seems unnecessary at the moment, but doing this now will set us up for future growth of the application. */

//3.4 added Post const and export

const User = require("./User");
const Post = require("./Post");

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

module.exports = {User, Post};