const bcrypt = require('bcryptjs');
const { User, UserGroup } = require('../../models');
const createRandomString = require('../../utils/createRandomString');

const getAllUsers = async () => {
  const users = await User.findAll({
    include: UserGroup,
  });
  return users;
};

const createUser = async ({ HoTen, Email, MatKhau, MaNhom }) => {
  const hashedPassword = await bcrypt.hash(MatKhau, 10);
  await User.create({
    MaNguoiDung: createRandomString(8),
    HoTen,
    Email,
    MatKhau: hashedPassword,
    MaNhom,
  });
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

module.exports = {
  getAllUsers,
  createUser,
  editUser,
  deleteUser,
};
