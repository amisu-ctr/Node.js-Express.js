// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };
const User = require('../model/User')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
// const fsPromises = require('fs').promises
// const path = require('path')

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ message: "username and password required" });
 
    // const foundUser = usersDB.users.find((person) => person.username === user);
    const foundUser = await User.findOne({username: user}).exec();
  if (!foundUser) return res.sendStatus(401); // Unauthorized
  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles) // returns array with object values 
    // create JWTs
    const accessToken = jwt.sign(
      {
        // Using userInfo as a different name space and thats good because its considered as a private jwt claim, There are some reserved words/abbreviations for public jwt claims more at jwt.io
        "UserInfo": {
          "username": foundUser.username,
          "roles": roles // We are sending the roles not the word admin or editor etc 
        }
      },
     
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s'}
    )
    const refreshToken = jwt.sign(
      {"username": foundUser.username},
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: '1d'}
    );
    
    // creates an array of the users that are not loged in 
    // const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username)
    // // Saving refreshToken with current user. Doin this will allow us to invalidate that refresh token as the current user logs out. If they logout before their one day expires
    // const currentUser = {...foundUser, refreshToken};
    // usersDB.setUsers([...otherUsers, currentUser])
    // await fsPromises.writeFile(
    //   path.join(__dirname, '..', 'model', 'users.json'),
    //   JSON.stringify(usersDB.users)
    // )
    //  Saving refreshToken with current user
    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()
    console.log(result)

    //  // refreshtoken stored into the online databasea above so that it can be crossed refrenced when it is sent back to create antoher access token
    res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'none', /*secure: true*/ maxAge: 24 * 60 * 60 * 1000}) //setting http only makes it unavailabe to javascript.
    // sending accesstoken as json that the frontend dev can grab
    res.json({accessToken});
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
