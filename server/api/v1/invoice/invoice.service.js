/* eslint-disable camelcase */
const { Op } = require('sequelize');
const { sequelize } = require('../utils/database_connection');
const { Invoice, InvoiceDetail, Voucher, Room } = require('../models');
const createRandomString = require('../utils/createRandomString');

const getInvoices = async () => {
  const invoices = await Invoice.findAll({
    raw: true,
    where: {
      DaXoa: false,
    },
  });
  return Promise.all(
    invoices.map(async (invoice) => {
      const invoiceDetails = await InvoiceDetail.findAll({
        where: {
          MaHoaDon: invoice.MaHoaDon,
        },
      });
      console.log(invoiceDetails);
      // eslint-disable-next-line no-param-reassign
      invoice.CTHD = invoiceDetails;
      return invoice;
    })
  );
};

const createInvoice = async ({
  KhachHang_CoQuan,
  DiaChi,
  NgayLap,
  TongTien,
  CacPhieuThuePhong,
}) => {
  const transaction = await sequelize.transaction({
    autocommit: false,
  });
  try {
    const invoice = await Invoice.create(
      {
        MaHoaDon: createRandomString(8),
        KhachHang_CoQuan,
        DiaChi,
        NgayLap,
        TongTien,
      },
      { transaction }
    );

    await Promise.all(
      CacPhieuThuePhong.map(async (PhieuThuePhong) => {
        await InvoiceDetail.create(
          {
            MaPhieuThuePhong: PhieuThuePhong.MaPhieuThuePhong,
            MaHoaDon: invoice.MaHoaDon,
            SoNgayThue: PhieuThuePhong.SoNgayThue,
            DonGia: PhieuThuePhong.DonGia,
          },
          { transaction }
        );
        const voucher = await Voucher.findByPk(PhieuThuePhong.MaPhieuThuePhong);
        await Room.update(
          { MaTinhTrang: 'TT001' },
          {
            where: {
              MaPhong: voucher.MaPhong,
            },
            transaction,
          }
        );
      })
    );

    await Voucher.update(
      { DaXoa: true },
      {
        where: {
          MaPhieuThuePhong: {
            [Op.in]: CacPhieuThuePhong.map(
              (PhieuThuePhong) => PhieuThuePhong.MaPhieuThuePhong
            ),
          },
        },
        transaction,
      }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
const deleteInvoice = async ({ MaHoaDon }) => {
  const transaction = await sequelize.transaction({
    autocommit: false,
  });
  try {
    await InvoiceDetail.destroy(
      {
        where: {
          MaHoaDon,
        },
      },
      { transaction }
    );
    await Invoice.destroy(
      {
        where: {
          MaHoaDon,
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

module.exports = {
  getInvoices,
  createInvoice,
  deleteInvoice,
};
