/* eslint-disable camelcase */
const invoiceService = require('./invoice.service');

const getInvoices = async (req, res, next) => {
  try {
    const DAO = await invoiceService.getInvoices();
    res.status(200).json(DAO);
  } catch (error) {
    next(error);
  }
};

const createInvoice = async (req, res, next) => {
  try {
    const { KhachHang_CoQuan, DiaChi, NgayLap, CacMaPhieuThuePhong } = req.body;
    await invoiceService.createInvoice({
      KhachHang_CoQuan,
      DiaChi,
      NgayLap,
      CacMaPhieuThuePhong,
    });
    res.status(200).json({ message: 'Create invoice successful' });
  } catch (error) {
    next(error);
  }
};

const deleteInvoice = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'API was deprecated' });
    // const { MaHoaDon } = req.params;
    // await invoiceService.deleteInvoice({ MaHoaDon });
    // res.status(200).json({ message: 'Delete successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInvoices,
  createInvoice,
  deleteInvoice,
};
