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

module.exports = {
  getReport,
};
