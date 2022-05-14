const ConfigService = require('./config.service');

const getSettingConfig = async (req, res, next) => {
  try {
    const DAO = await ConfigService.getSettingConfig();
    res.status(200).json(DAO);
  } catch (error) {
    next(error);
  }
};

const updateConfig = async (req, res, next) => {
  try {
    const { MaThamSo } = req.params;
    const { GiaTri } = req.body;
    await ConfigService.updateConfig({ MaThamSo, GiaTri });
    res.status(200).json({ message: 'Update successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettingConfig,
  updateConfig,
};
