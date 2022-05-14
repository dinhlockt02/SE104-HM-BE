const router = require('express').Router();
const customerTypeController = require('./customer_type.controller');

router.get('/', customerTypeController.getAllCustomerType);
router.post('/', customerTypeController.addCustomerType);
router.put('/:MaLoaiKhach', customerTypeController.updateCustomerType);
router.get('/:MaLoaiKhach', customerTypeController.getCustomerTypeByKey);
router.delete('/:MaLoaiKhach', customerTypeController.deleteCustomerType);

module.exports = router;
