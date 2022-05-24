const { Report, ReportDetail } = require('../models');
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
  const m = TodayDate.getMonth();
  const y = TodayDate.getFullYear();
  if (!(y > Nam || (y === Nam && m > Thang)))
    throw Error("Report can't be created because time");
  const report = await Report.findOne({
    include: [{ model: ReportDetail }],
    where: {
      DaXoa: false,
      Thang,
      Nam,
    },
  });
  if (report != null) return report;
  await createReport({ Thang, Nam });
  return Report.findOne({
    include: [{ model: ReportDetail }],
    where: {
      DaXoa: false,
      Thang,
      Nam,
    },
  });
};

module.exports = {
  getReport,
};
