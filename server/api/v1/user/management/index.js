const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.getAllUser);
router.post('/', controller.createUser);
router.put('/:MaNguoiDung', controller.editUser);
router.delete('/:MaNguoiDung', controller.deleteUser);

module.exports = router;
