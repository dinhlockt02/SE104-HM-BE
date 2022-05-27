const ExcelJS = require('exceljs');
const { Report, ReportDetail, RoomType } = require('../models');
const { sequelize } = require('../utils/database_connection');
const createRandomString = require('../utils/createRandomString');

const timTongDoanhThuTheoThangQuery = ({
  Thang,
  Nam,
}) => `SELECT PHONG.MaLoaiPhong,
SUM(CTHD.DonGia) as TongDoanhThuTheoThang
FROM PHONG, PHIEUTHUEPHONG, CTHD, HOADON 
WHERE PHONG.MaPhong = PHIEUTHUEPHONG.MaPhong 
AND PHIEUTHUEPHONG.MaPhieuThuePhong = CTHD.MaPhieuThuePhong 
AND CTHD.MaHoaDon = HOADON.MaHoaDon
AND MONTH(NgayLap) = ${Number.parseInt(Thang, 10)}
AND YEAR(NgayLap) = ${Number.parseInt(Nam, 10)}
GROUP BY PHONG.MaLoaiPhong;`;

const createReport = async ({ Thang, Nam }) => {
  const transaction = await sequelize.transaction();
  try {
    const report = await Report.create(
      {
        MaBaoCao: createRandomString(8),
        Thang,
        Nam,
      },
      { transaction, raw: true }
    );

    const [result] = await sequelize.query(
      timTongDoanhThuTheoThangQuery({ Thang, Nam }),
      { transaction }
    );

    let TongDoanhThu = 0;

    const resultDetails = await Promise.all(
      result.map(async (resultItem) => {
        TongDoanhThu += Number.parseInt(resultItem.TongDoanhThuTheoThang, 10);
        return ReportDetail.create(
          {
            MaBaoCao: report.MaBaoCao,
            MaLoaiPhong: resultItem.MaLoaiPhong,
            DoanhThuTheoThang: Number.parseInt(
              resultItem.TongDoanhThuTheoThang,
              10
            ),
            TiLe: 0,
          },
          { transaction, raw: true }
        );
      })
    );

    await Report.update(
      { TongDoanhThu },
      {
        where: {
          MaBaoCao: report.MaBaoCao,
        },
        transaction,
      }
    );

    await Promise.all(
      resultDetails.map(async (resultDetail) => {
        const TiLe = resultDetail.DoanhThuTheoThang / TongDoanhThu;
        ReportDetail.update(
          { TiLe },
          {
            where: {
              MaBaoCao: resultDetail.MaBaoCao,
              MaLoaiPhong: resultDetail.MaLoaiPhong,
            },
            raw: true,
            transaction,
          }
        );
      })
    );

    const updatedReport = await Report.findAll({
      where: {
        MaBaoCao: report.MaBaoCao,
      },
      raw: true,
      transaction,
    });

    const updateReportDetail = await ReportDetail.findAll({
      where: {
        MaBaoCao: report.MaBaoCao,
      },
      raw: true,
      transaction,
    });

    updatedReport.reportDetails = updateReportDetail;

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getReport = async ({ Thang, Nam }) => {
  const TodayDate = new Date();
  const m = TodayDate.getMonth() + 1;
  const y = TodayDate.getFullYear();
  if (
    !(
      y > Number.parseInt(Nam, 10) ||
      (y === Number.parseInt(Nam, 10) && m > Thang)
    )
  )
    throw Error("Report can't be created because time");
  const report = await Report.findOne({
    include: [{ model: ReportDetail, include: [{ model: RoomType }] }],
    where: {
      DaXoa: false,
      Thang,
      Nam,
    },
  });
  if (report != null) return report;
  await createReport({ Thang, Nam });
  return Report.findOne({
    include: [{ model: ReportDetail, include: [{ model: RoomType }] }],
    where: {
      DaXoa: false,
      Thang,
      Nam,
    },
  });
};

const getReportExcel = async ({ Thang, Nam }) => {
  const report = await getReport({ Thang, Nam });
  const reportDetailExcel = report.ReportDetails.map((reportDetail) => ({
    MaLoaiPhong: reportDetail.MaLoaiPhong,
    DoanhThuTheoThang: Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(reportDetail.DoanhThuTheoThang),
    TiLe: reportDetail.TiLe,
    TenLoaiPhong: reportDetail.RoomType.TenLoaiPhong,
  }));
  const workbook = new ExcelJS.Workbook();
  const font = { size: 16 };
  const sheet = workbook.addWorksheet(
    `Tháng ${report.Thang} Năm ${report.Nam}`
  );
  sheet.columns = [
    { header: 'Mã loại phòng', key: 'MaLoaiPhong', width: 30 },
    { header: 'Tên loại phòng', key: 'TenLoaiPhong', width: 30 },
    { header: 'Tỉ lệ', key: 'TiLe', width: 20, style: { numFmt: '0.00%' } },
    {
      header: 'Doanh thu theo tháng',
      key: 'DoanhThuTheoThang',
      width: 30,
    },
  ];
  sheet.addRows(reportDetailExcel);
  const sumRow = sheet.rowCount + 1;
  sheet.mergeCells(`A${sumRow}:B${sumRow}`);
  sheet.getCell(`A${sumRow}`).value = 'Tổng';
  sheet.getCell(`C${sumRow}`).value = 1;
  sheet.getCell(`C${sumRow}`).numFmt = '0.00%';
  sheet.getCell(`D${sumRow}`).value = Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(report.TongDoanhThu);
  sheet.eachRow((row) => {
    row.eachCell((cel) => {
      cel.font = font;
      cel.alignment = { vertical: 'middle', horizontal: 'center' };
    });
  });

  sheet.getCell(`A${sumRow}`).font = { ...font, bold: true };
  sheet.getCell(`C${sumRow}`).font = { ...font, bold: true };
  sheet.getCell(`D${sumRow}`).font = { ...font, bold: true };
  const filename = `${__dirname}/report.xlsx`;
  await workbook.xlsx.writeFile(filename);
  return filename;
};

module.exports = {
  getReport,
  getReportExcel,
};
