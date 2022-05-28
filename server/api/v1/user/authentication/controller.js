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

module.exports = {
  login,
};
