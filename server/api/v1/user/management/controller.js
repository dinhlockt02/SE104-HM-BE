const service = require('./service');

const getAllUser = async (req, res, next) => {
  try {
    const DAO = await service.getAllUsers();
    res.status(200).json(DAO);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { HoTen, Email, MatKhau, MaNhom } = req.body;
    await service.createUser({ HoTen, Email, MatKhau, MaNhom });
    res.status(201).json({ message: 'Create successful' });
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const { MaNguoiDung } = req.params;
    const { HoTen, Email, MaNhom } = req.body;
    await service.editUser(MaNguoiDung, { HoTen, Email, MaNhom });
    res.status(200).json({ message: 'Update successful' });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { MaNguoiDung } = req.params;
    await service.deleteUser(MaNguoiDung);
    res.status(200).json({ message: 'Delete successful' });
  } catch (error) {
    next(error);
  }
};

const getAllUserGroup = async (req, res, next) => {
  try {
    const DAO = await service.getAllUserGroup();
    res.status(200).json(DAO);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUser,
  createUser,
  editUser,
  deleteUser,
  getAllUserGroup,
};
