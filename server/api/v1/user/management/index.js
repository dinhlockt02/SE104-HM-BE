const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.getAllUser);
router.get('/user-group', controller.getAllUserGroup);
router.post('/', controller.createUser);
router.put('/:MaNguoiDung', controller.editUser);
router.delete('/:MaNguoiDung', controller.deleteUser);

module.exports = router;
