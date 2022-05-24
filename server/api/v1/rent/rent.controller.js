const rentService = require('./rent.service');

const getRenRoomVoucher = async (req, res, next) => {
  try {
    const DAO = await rentService.getRenRoomVouchers();
    res.status(200).json(DAO);
  } catch (error) {
    next(error);
  }
};

const createRentRoomVoucher = async (req, res, next) => {
  try {
    const { MaPhong, NgayBatDauThue, CacKhachHang, DonGiaThueTrenNgay } =
      req.body;
    await rentService.createRentRoomVoucher({
      MaPhong,
      NgayBatDauThue,
      CacKhachHang,
      DonGiaThueTrenNgay,
    });
    res.status(200).json({
      message: 'Create successful',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRentRoomVoucher,
  getRenRoomVoucher,
};
