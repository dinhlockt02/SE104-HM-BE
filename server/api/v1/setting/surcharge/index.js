const router = require('express').Router();
const surchareController = require('./surcharge.controller');

router.get('/', surchareController.getSurcharges);
router.post('/:SoKhach', surchareController.addSurcharge);
router.put('/:SoKhach', surchareController.updateSurcharge);
router.delete('/:SoKhach', surchareController.deleteSurcharge);

module.exports = router;
