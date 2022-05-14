const customerTypeService = require('./customer_type.service');

const getAllCustomerType = async (req, res, next) => {
  try {
    const DAO = await customerTypeService.getAllCustomerType();
    res.status(200).json(DAO);
  } catch (error) {
    next(error);
  }
};
const addCustomerType = async (req, res, next) => {
  try {
    const { TenLoaiKhach, HeSoPhuThu } = req.body;
    await customerTypeService.addCustomerType({ TenLoaiKhach, HeSoPhuThu });
    res.status(201).json({ message: 'Add successful' });
  } catch (error) {
    next(error);
  }
};

const updateCustomerType = async (req, res, next) => {
  try {
    const { MaLoaiKhach } = req.params;
    const { TenLoaiKhach, HeSoPhuThu } = req.body;
    await customerTypeService.updateCustomerType({
      MaLoaiKhach,
      TenLoaiKhach,
      HeSoPhuThu,
    });
    res.status(200).json({ message: 'Update successful' });
  } catch (error) {
    next(error);
  }
};

const getCustomerTypeByKey = async (req, res, next) => {
  try {
    const { MaLoaiKhach } = req.params;
    const customerType = await customerTypeService.getCustomerTypeByKey({
      MaLoaiKhach,
    });
    res.status(200).json(customerType);
  } catch (error) {
    next(error);
  }
};

const deleteCustomerType = async (req, res, next) => {
  try {
    const { MaLoaiKhach } = req.params;
    await customerTypeService.deleteCustomerType({ MaLoaiKhach });
    res.status(200).json({ message: 'Delete successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCustomerType,
  addCustomerType,
  updateCustomerType,
  getCustomerTypeByKey,
  deleteCustomerType,
};
