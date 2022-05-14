const { SettingConfig } = require('../../models');

const getSettingConfig = async () => SettingConfig.findAll();
const updateConfig = async ({ MaThamSo, GiaTri }) => {
  await SettingConfig.update(
    { GiaTri },
    {
      where: {
        MaThamSo,
      },
    }
  );
};

module.exports = {
  getSettingConfig,
  updateConfig,
};
