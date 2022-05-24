const { Voucher, VoucherDetail, Room, RoomType } = require('../models');
const createRandomString = require('../utils/createRandomString');
const { sequelize } = require('../utils/database_connection');

const getRenRoomVouchers = async () => {
  const vouchers = await Voucher.findAll({
    include: [{ model: Room, include: RoomType }],
    raw: true,
    nest: true,
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
  const t = await sequelize.transaction();
  try {
    const vourcher = await Voucher.create({
      MaPhieuThuePhong: createRandomString(8),
      NgayBatDauThue,
      MaPhong,
      SoKhach: CacKhachHang.length,
      DonGiaThueTrenNgay,
    });
    await Promise.all(
      CacKhachHang.map((khachHang) =>
        VoucherDetail.create({
          MaCTPhieuThuePhong: createRandomString(8),
          MaPhieuThuePhong: vourcher.MaPhieuThuePhong,
          CMND: khachHang.CMND,
          TenKhachHang: khachHang.TenKhachHang,
          DiaChi: khachHang.DiaChi,
          MaLoaiKhach: khachHang.MaLoaiKhach,
        })
      )
    );
    await t.commit();
  } catch (error) {
    await t.rollback();
  }
};

module.exports = {
  createRentRoomVoucher,
  getRenRoomVouchers,
};
