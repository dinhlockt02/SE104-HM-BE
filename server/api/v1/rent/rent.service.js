const {
  Voucher,
  VoucherDetail,
  Room,
  RoomType,
  RoomState,
  InvoiceDetail,
  Invoice,
  CustomerType,
} = require('../models');
const createRandomString = require('../utils/createRandomString');
const { sequelize } = require('../utils/database_connection');

const getRenRoomVouchers = async () => {
  const vouchers = await Voucher.findAll({
    include: [{ model: Room, include: RoomType }],
    raw: true,
    nest: true,
    where: {
      DaXoa: false,
    },
  });
  vouchers.forEach((voucher) => {
    // eslint-disable-next-line no-param-reassign
    voucher.Room.LoaiPhong = voucher.Room.RoomType;
    // eslint-disable-next-line no-param-reassign
    delete voucher.Room.RoomType;
    // eslint-disable-next-line no-param-reassign
    voucher.Phong = voucher.Room;
    // eslint-disable-next-line no-param-reassign
    delete voucher.Room;
  });
  return Promise.all(
    vouchers.map(async (voucher) => {
      const voucherDetails = await VoucherDetail.findAll({
        where: {
          MaPhieuThuePhong: voucher.MaPhieuThuePhong,
          DaXoa: false,
        },
      });
      // eslint-disable-next-line no-param-reassign
      voucher.CTPhieuThuePhong = voucherDetails;
      return voucher;
    })
  );
};

const createRentRoomVoucher = async ({
  MaPhong,
  NgayBatDauThue,
  CacKhachHang,
  DonGiaThueTrenNgay,
}) => {
  const transaction = await sequelize.transaction();
  try {
    const vourcher = await Voucher.create(
      {
        MaPhieuThuePhong: createRandomString(8),
        NgayBatDauThue,
        MaPhong,
        SoKhach: CacKhachHang.length,
        DonGiaThueTrenNgay,
      },
      { transaction }
    );
    await Promise.all(
      CacKhachHang.map((khachHang) =>
        VoucherDetail.create(
          {
            MaCTPhieuThuePhong: createRandomString(8),
            MaPhieuThuePhong: vourcher.MaPhieuThuePhong,
            CMND: khachHang.CMND,
            TenKhachHang: khachHang.TenKhachHang,
            DiaChi: khachHang.DiaChi,
            MaLoaiKhach: khachHang.MaLoaiKhach,
          },
          { transaction }
        )
      )
    );
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteRentRoomVoucher = async ({ MaPhieuThuePhong }) => {
  const transaction = await sequelize.transaction();
  try {
    await VoucherDetail.update(
      { DaXoa: true },
      {
        where: {
          MaPhieuThuePhong,
        },
      },
      { transaction }
    );
    await Voucher.update(
      { DaXoa: true },
      {
        where: {
          MaPhieuThuePhong,
        },
      },
      { transaction }
    );
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getRentRoomVoucherByKey = async ({ MaPhieuThuePhong }) => {
  const voucher = await Voucher.findByPk(MaPhieuThuePhong, {
    include: [
      { model: Room, include: [RoomType] },
      { model: InvoiceDetail, include: [Invoice] },
      { model: VoucherDetail, include: [CustomerType] },
    ],
  });
  return voucher;
};

module.exports = {
  createRentRoomVoucher,
  getRenRoomVouchers,
  deleteRentRoomVoucher,
  getRentRoomVoucherByKey,
};
