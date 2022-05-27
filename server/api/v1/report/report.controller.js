const fs = require('fs');
const reportService = require('./report.service');

const getReport = async (req, res, next) => {
  try {
    const { Thang, Nam } = req.params;
    const DAO = await reportService.getReport({ Thang, Nam });
    res.status(200).json(DAO);
  } catch (error) {
    next(error);
  }
};

const getReportExcel = async (req, res, next) => {
  try {
    const { Thang, Nam } = req.params;
    const filename = await reportService.getReportExcel({ Thang, Nam });
    console.log(filename);
    res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');
    res.status(200).sendFile(filename, (err) => {
      if (err) {
        console.log(err);
      } else {
        fs.unlink(filename, (error) => {
          if (error) console.log(error);
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getReport,

  getReportExcel,
};
