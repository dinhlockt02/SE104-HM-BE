const bcrypt = require('bcryptjs');
const { User, UserGroup } = require('../../models');
const createRandomString = require('../../utils/createRandomString');
const sendEmail = require('../../utils/send_email');

const getAllUsers = async () => {
  const users = await User.findAll({
    include: UserGroup,
  });
  return users;
};

const createUser = async ({ HoTen, Email, MaNhom }) => {
  const MatKhau = createRandomString(8);
  const hashedPassword = await bcrypt.hash(MatKhau, 10);
  const MaNguoiDung = createRandomString(8);
  await User.create({
    MaNguoiDung,
    HoTen,
    Email,
    MatKhau: hashedPassword,
    MaNhom,
  });
  try {
    await sendEmail({
      emailTo: Email,
      subject: 'Welcome new user',
      text: 'You have been registered',
      html: `Your password is <b>${MatKhau}</b>`,
    });
  } catch (error) {
    await User.destroy({
      where: {
        MaNguoiDung,
      },
    });
    throw error;
  }
};

const editUser = async (MaNguoiDung, { HoTen, Email, MaNhom }) => {
  await User.update(
    { HoTen, Email, MaNhom },
    {
      where: {
        MaNguoiDung,
      },
    }
  );
};

const deleteUser = async (MaNguoiDung) => {
  await User.destroy({
    where: {
      MaNguoiDung,
    },
  });
};

const getAllUserGroup = async () => UserGroup.findAll();

module.exports = {
  getAllUsers,
  createUser,
  editUser,
  deleteUser,
  getAllUserGroup,
};
