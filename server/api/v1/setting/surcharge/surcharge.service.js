const { Surcharge } = require('../../models');

const getSurcharges = async () => {
  const surcharges = await Surcharge.findAll();
  return surcharges;
};

const addSurcharge = async ({ SoKhach, TiLePhuThu }) => {
  await Surcharge.create({ SoKhach, TiLePhuThu });
};

const updateSurcharge = async ({ SoKhach, TiLePhuThu }) => {
  await Surcharge.update(
    { TiLePhuThu },
    {
      where: {
        SoKhach,
      },
    }
  );
};

const deleteSurcharge = async ({ SoKhach }) => {
  await Surcharge.destroy({
    where: {
      SoKhach,
    },
  });
};

module.exports = {
  getSurcharges,
  addSurcharge,
  updateSurcharge,
  deleteSurcharge,
};
