const service = require('./service');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const DAO = await service.login({ email, password });
    res.status(200).json(DAO);
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    await service.forgotPassword(email);
    res.status(200).json({ message: 'Send successful' });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { ResetCode, MatKhau } = req.body;
    await service.resetPassword({ ResetCode, MatKhau });
    res.status(200).json({ message: 'Update successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  forgotPassword,
  resetPassword,
};
