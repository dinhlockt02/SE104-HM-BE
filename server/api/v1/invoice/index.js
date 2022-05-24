const router = require('express').Router();
const invoiceController = require('./invoice.controller');

router.get('/', invoiceController.getInvoices);
router.post('/', invoiceController.createInvoice);
router.delete('/:MaHoaDon', invoiceController.deleteInvoice);

module.exports = router;
