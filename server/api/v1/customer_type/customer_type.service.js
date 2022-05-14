const { CustomerType } = require('../models/index');
const createRandomString = require('../utils/createRandomString');

const getAllCustomerType = async () => {
  const customerTypes = await CustomerType.findAll();
  return customerTypes;
};

const addCustomerType = async ({ TenLoaiKhach, HeSoPhuThu }) => {
  await CustomerType.create({
    MaLoaiKhach: createRandomString(8),
    TenLoaiKhach,
    HeSoPhuThu,
  });
};

const updateCustomerType = async ({
  MaLoaiKhach,
  TenLoaiKhach,
  HeSoPhuThu,
}) => {
  await CustomerType.update(
    { TenLoaiKhach, HeSoPhuThu },
    {
      where: {
        MaLoaiKhach,
      },
    }
  );
};

const getCustomerTypeByKey = async ({ MaLoaiKhach }) => {
  const customerType = await CustomerType.findByPk(MaLoaiKhach);
  return customerType;
};

const deleteCustomerType = async ({ MaLoaiKhach }) => {
  CustomerType.destroy({
    where: {
      MaLoaiKhach,
    },
  });
};

module.exports = {
  getAllCustomerType,
  addCustomerType,
  updateCustomerType,
  getCustomerTypeByKey,
  deleteCustomerType,
};
