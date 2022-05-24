/* eslint-disable camelcase */
const { Op } = require('sequelize');
const { sequelize } = require('../utils/database_connection');
const { Invoice, InvoiceDetail, Voucher } = require('../models');
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
  CacMaPhieuThuePhong,
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
        TongTien: 0,
      },
      { transaction }
    );

    let TongTien = 0;

    await Promise.all(
      CacMaPhieuThuePhong.map(async (MaPhieuThuePhong) => {
        const voucher = await Voucher.findByPk(MaPhieuThuePhong);
        const SoNgayThue =
          (Date.parse(invoice.NgayLap) - Date.parse(voucher.NgayBatDauThue)) /
          (1000 * 60 * 60 * 24);
        const DonGia = SoNgayThue * voucher.DonGiaThueTrenNgay;
        TongTien += DonGia;
        await InvoiceDetail.create(
          {
            MaPhieuThuePhong,
            MaHoaDon: invoice.MaHoaDon,
            SoNgayThue,
            DonGia,
          },
          { transaction }
        );
      })
    );

    await Invoice.update(
      { TongTien },
      {
        where: {
          MaHoaDon: invoice.MaHoaDon,
        },
        transaction,
      }
    );

    await Voucher.update(
      { DaXoa: true },
      {
        where: {
          MaPhieuThuePhong: {
            [Op.in]: CacMaPhieuThuePhong,
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
