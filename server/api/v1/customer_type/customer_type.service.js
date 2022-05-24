const { CustomerType } = require('../models/index');
const createRandomString = require('../utils/createRandomString');

const getAllCustomerType = async () => {
  const customerTypes = await CustomerType.findAll({
    where: {
      DaXoa: false,
    },
  });
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
        DaXoa: false,
      },
    }
  );
};

const getCustomerTypeByKey = async ({ MaLoaiKhach }) => {
  const customerType = await CustomerType.findByPk(MaLoaiKhach, {
    where: {
      DaXoa: false,
    },
  });
  return customerType;
};

const deleteCustomerType = async ({ MaLoaiKhach }) => {
  await CustomerType.update(
    { DaXoa: true },
    {
      where: {
        MaLoaiKhach,
      },
    }
  );
};

module.exports = {
  getAllCustomerType,
  addCustomerType,
  updateCustomerType,
  getCustomerTypeByKey,
  deleteCustomerType,
};
