const router = require('express').Router();
const {sale_controller} = require('../controllers');
const {sale_middleware} = require('../middlewares');

router.post('/add', sale_middleware.verifyTypes, sale_controller.addSale );
router.get('/list', sale_controller.getAllSales);
router.put('/update', sale_controller.updateSale );
router.delete('/delete/:id', sale_controller.deleteSale );

module.exports = router;