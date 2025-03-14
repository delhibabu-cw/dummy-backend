const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashGenerate = async (plainpassword) => {
  const hash = await bcrypt.hash(plainpassword, saltRounds);  
  return hash;
};

module.exports = hashGenerate;
