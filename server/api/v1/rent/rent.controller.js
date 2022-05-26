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

const deleteRentRoomVoucher = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'API was deprecated' });
    // const { MaPhieuThuePhong } = req.params;
    // await rentService.deleteRentRoomVoucher({
    //   MaPhieuThuePhong,
    // });
    // res.status(200).json({
    //   message: 'Delete successful',
    // });
  } catch (error) {
    next(error);
  }
};

const getRentRoomVoucherByKey = async (req, res, next) => {
  try {
    const { MaPhieuThuePhong } = req.params;
    const DAO = await rentService.getRentRoomVoucherByKey({ MaPhieuThuePhong });
    res.status(200).json(DAO);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRentRoomVoucher,
  getRenRoomVoucher,
  deleteRentRoomVoucher,
  getRentRoomVoucherByKey,
};
