const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (data) {
      this.users = data;
    },
  };
    
  const jwt = require('jsonwebtoken');
  require('dotenv').config();

  
  const handleRefreshToken =  (req, res) => {
    const cookies = req.cookies
    console.log(req)
    //check for cookie and if there is, check for jwt property
    if (!cookies?.jwt)
      return res.status(401) //unauthorized if there isnt
    console.log(cookies.jwt)
    
    const refreshToken = cookies.jwt
    const foundUser = usersDB.users.find((person) => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(401); // Forbidden
    //evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {'username' : decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'} //you might want to set it to a longer time in your production app this is jsut for tutorial
            );
            res.json({accessToken})
        }
    )
  };
  
  module.exports = { handleRefreshToken };
  // The username on decoded was made available at time of creating tokens with  jwt.sing in auth
   