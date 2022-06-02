const { SettingConfig, Surcharge } = require('../../models');
const { sequelize } = require('../../utils/database_connection');

const getSettingConfig = async () => SettingConfig.findAll();
const updateConfig = async ({ MaThamSo, GiaTri }) => {
  const transaction = await sequelize.transaction({
    autocommit: false,
  });
  try {
    let SoKhachToiDa = (await SettingConfig.findByPk('MTS01')).GiaTri;
    let SoKhachKhongPhuThu = (await SettingConfig.findByPk('MTS02')).GiaTri;
    await SettingConfig.update(
      { GiaTri },
      {
        where: {
          MaThamSo,
        },
        transaction,
      }
    );
    if (MaThamSo === 'MTS01') SoKhachToiDa = GiaTri;
    else if (MaThamSo === 'MTS02') SoKhachKhongPhuThu = GiaTri;
    if (SoKhachToiDa < SoKhachKhongPhuThu)
      throw Error('So khach toi da khong duoc nho hon so khach khong phu thu');
    await Surcharge.destroy(
      {
        truncate: true,
      },
      { transaction }
    );
    const soKhachs = [];
    for (
      let i = Number(SoKhachKhongPhuThu) + 1;
      i <= Number(SoKhachToiDa);
      i += 1
    ) {
      soKhachs.push(i);
    }
    console.log(SoKhachToiDa);
    console.log(soKhachs);
    await Promise.all(
      soKhachs.map(async (SoKhach) =>
        Surcharge.create(
          {
            SoKhach,
            TiLePhuThu: 0,
          },
          {
            transaction,
          }
        )
      )
    );
    await transaction.commit();
  } catch (error) {
    transaction.rollback();
    throw error;
  }
};

module.exports = {
  getSettingConfig,
  updateConfig,
};
