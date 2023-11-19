const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (data) {
      this.users = data;
    },
  };
  const fsPromises = require('fs').promises
  const path = require('path')
  //The above are just requirements to access our user database in this case our json file. Its just for demonstrating purposes. In a real scenerio will be using an actual databse like mongo, postgress or any other database .

  const handleLogout =  async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies
    //check for cookie and if there is, check for jwt property
    if (!cookies?.jwt)
      return res.sendStatus(204); //No content   //we are deleting it anyway
    const refreshToken = cookies.jwt

    // Is refreshToken in db
    const foundUser = usersDB.users.find((person) => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', {httpOnly: true});
        return res.sendStatus(204); //No content
        // 204 to say simply say 'this was successful but no content'
    }

    // Delete refreshToken in db
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
 
    const currentUser = {...foundUser, refreshToken: ''}
    console.log(currentUser)
    //update db with above with refreshtoken set to empty
    usersDB.setUsers([...otherUsers, currentUser])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    );


    res.clearCookie('jwt', {httpOnly: true}); // secure: true - only serves on https
    res.sendStatus(204)
 
};
  
  module.exports = { handleLogout };

  // The username on decoded was made available at time of creating tokens with  jwt.sing in auth
   