const surchargeService = require('./surcharge.service');

const getSurcharges = async (req, res, next) => {
  try {
    const DAO = await surchargeService.getSurcharges();
    res.status(200).json(DAO);
  } catch (error) {
    next(error);
  }
};

const addSurcharge = async (req, res, next) => {
  res.status(200).json({ message: 'API was deprecated' });
  // try {
  //   const { SoKhach } = req.params;
  //   const { TiLePhuThu } = req.body;
  //   await surchargeService.addSurcharge({ SoKhach, TiLePhuThu });
  //   res.status(201).json({ message: 'Add surcharge successful' });
  // } catch (error) {
  //   next(error);
  // }
};

const updateSurcharge = async (req, res, next) => {
  try {
    const { SoKhach } = req.params;
    const { TiLePhuThu } = req.body;
    await surchargeService.updateSurcharge({ SoKhach, TiLePhuThu });
    res.status(200).json({ message: 'Update surcharge successful' });
  } catch (error) {
    next(error);
  }
};

const deleteSurcharge = async (req, res, next) => {
  res.status(200).json({ message: 'API was decprecated' });
  // try {
  //   const { SoKhach } = req.params;
  //   await surchargeService.deleteSurcharge({ SoKhach });
  //   res.status(200).json({ message: 'Delete surcharge successful' });
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = {
  getSurcharges,
  addSurcharge,
  updateSurcharge,
  deleteSurcharge,
};
