//3.4

const {Model, DataTypes, INTEGER} = require("sequelize");
const sequelize = require("../config/connection");

//3.4 create our Post model
class Post extends Model {
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        })
        .then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    "id",
                    "post_url",
                    "title",
                    "created_at",
                    [
                        sequelize.literal("(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)"),
                        "vote_count"
                    ]
                ]
            });
        });
    }
}

//3.4 create fields/columns for Post model
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "post"
    }
);

/* 3.4 In the first parameter for the Post.init function, 
we define the Post schema. We've identified the id column 
as the primary key and set it to auto-increment. Next we 
define the title column as a String value.

Then we include the post_url field, which is also defined 
as a String. Sequelize has the ability to offer validation 
in the schema definition. Here, we ensure that this url is 
a verified link by setting the isURL property to true.

Next, we have the user_id column. Can you guess what this 
column is for? That's right—this column determines who 
posted the news article. Using the references property, 
we establish the relationship between this post and the 
user by creating a reference to the User model, specifically 
to the id column that is defined by the key property, which 
is the primary key. The user_id is conversely defined as 
the foreign key and will be the matching link.

In the second parameter of the init method, we configure 
the metadata, including the naming conventions. */

//3.4 export created Post model
module.exports = Post;