const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User, UserGroup } = require('../../models');

const login = async ({ email, password }) => {
  const user = await User.findOne({ email, include: UserGroup });
  if (!user) throw Error('USER NOT FOUND');
  const equal = await bcrypt.compare(password, user.MatKhau);
  if (!equal) throw Error('PASSWORD NOT MATCH');
  return {
    token: jwt.sign(
      {
        MaNguoiDung: user.MaNguoiDung,
      },
      process.env.SECRET
    ),
    CapBac: user.UserGroup.CapBac,
  };
};

module.exports = {
  login,
};
