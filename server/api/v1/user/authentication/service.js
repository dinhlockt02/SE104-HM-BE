const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User, UserGroup } = require('../../models');
const sendEmail = require('../../utils/send_email');
const createRandomString = require('../../utils/createRandomString');

const login = async ({ email, password }) => {
  console.log(email);
  const user = await User.findOne({
    where: {
      Email: email,
    },
    include: UserGroup,
  });
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

const forgotPassword = async (email) => {
  const randomCode = createRandomString(4);
  await User.update(
    { ResetCode: randomCode },
    {
      where: {
        Email: email,
      },
    }
  );
  await sendEmail({
    emailTo: email,
    subject: 'Reset password',
    text: 'You have request reset password',
    html: `Your password code is <b>${randomCode}</b>`,
  });
};

const resetPassword = async ({ ResetCode, MatKhau }) => {
  const user = await User.findOne({
    where: {
      ResetCode,
    },
  });

  if (!user) throw Error('User not found');
  const hashedPassword = await bcrypt.hash(MatKhau, 10);
  await User.update(
    { MatKhau: hashedPassword, ResetCode: null },
    {
      where: {
        MaNguoiDung: user.MaNguoiDung,
      },
    }
  );
};

module.exports = {
  login,
  forgotPassword,
  resetPassword,
};
