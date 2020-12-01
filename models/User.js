//1.5 create the user model
const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");
//2.4
const bcrypt = require("bcrypt");

/* 2.5 Also known as lifecycle events, hooks are functions 
that are called before or after calls in Sequelize. */

//create our User model
//updated in 2.6 adding instance method
class User extends Model {
    //set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//define table columns and configuration
User.init(
    {
        //define an id column
        id: {
            //use the special Sequelize DataTypes object to provide what type of data it is
            type: DataTypes.INTEGER,
            //this is the equivalent of SQL's `NOT NULL` option
            allowNull: false,
            //instruct that this is the Primary Key
            primaryKey: true,
            //turn on auto increment
            autoIncrement: true
        },
        //define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //there cannot be any duplicate email values in this table
            unique: true,
            //if allowNull is set to false, we can run our data through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        //define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //this means the password must be at least four characters long
                len: [4]
            }
        }
    },
    {
        /* 2.5 Let's break down this code to see what is happening. 
        We use the beforeCreate() hook to execute the bcrypt hash 
        function on the plaintext password. In the bcrypt hash function, 
        we pass in the userData object that contains the plaintext password 
        in the password property. We also pass in a saltRound value of 10.

        The resulting hashed password is then passed to the Promise object 
        as a newUserData object with a hashed password property. The return 
        statement then exits out of the function, returning the hashed 
        password in the newUserData function.
        hooks: {
            //set up beforeCreate lifecycle "hook" functionality
            beforeCreate(userData) {
                return bcrypt.hash(userData.password, 10).then(newUserData => {
                    return newUserData;
                });
            }
        },
        */

        //2.5 actual hooks we'll use because their teaching methods are bat-shit insane
        hooks: {
            //set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            //set up beforeUpdate lifecycle "hook" functionality
            //we will need to add the option { individualHooks: true } in User.update in user-routes.js
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            }
        },

        //TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration)

        //pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        //don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        //don't pluralize name of database table
        freezeTableName: true,
        //use underscores instead of camel-casing (ie `comment_text` and not `commentText`)
        underscored: true,
        //make it so our model name stays lowercase in the database
        modelName: "user"
    }
);

module.exports = User;

/* First, we imported the Model class and DataTypes object from Sequelize. 
This Model class is what we create our own models from using the extends 
keyword so User inherits all of the functionality the Model class has.

Once we create the User class, we use the .init() method to initialize 
the model's data and configuration, passing in two objects as arguments. 
The first object will define the columns and data types for those columns. 
The second object it accepts configures certain options for the table. 

Lastly, export the newly created model so we can use it in other parts of the app.*/