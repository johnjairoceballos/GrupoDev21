const {Router}=require('express')
const router = Router()
const PruebaCtrl = require('../controllers/prueba.controllers')


router.get('/', PruebaCtrl.obtener)

router.post('/',PruebaCtrl.crear)

router.put('/',PruebaCtrl.actualizar)

router.delete('/',PruebaCtrl.eliminar)




module.exports = router