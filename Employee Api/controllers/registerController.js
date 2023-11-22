// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data)  {this.users = data}
// }

const User = require("../model/User");

// const fsPromises = require('fs').promises;
// const path = require('path')
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  // check for duplicate usernames in the db
  // const duplicate = usersDB.users.find(person => person.username === user);
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10); // 10 sorts it to make it more secured and harder for attackers to break it.

    // create new user
    // const newUser = {"username": user, "roles": {"User": 2001} , "password": hashedPwd};
    // store new user
    // usersDB.setUsers([...usersDB.users, newUser]);
    // write to jsonfile
    // await fsPromises.writeFile(
    //     path.join(__dirname, '..', 'model', 'users.json'),
    //     JSON.stringify(usersDB.users)
    // );

    // With mongoose we can create and store new user all at once
    const result = await User.create({
      username: user,
    //   roles: { User: 2001 }, We don need this because the default data is in our schema which will be added automatically just like id
      password: hashedPwd,
    });
    console.log(result)

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ messae: err.message });
  }
};

module.exports = { handleNewUser };
