const {Router}=require('express');
const { getPros, createPro, getPro, deletePro, updatePro} = require('../controllers/products.controllers');
const router = Router()


//desde controllers

router.route('/')
    .get(getPros)
    .post(createPro);


//router.route('/').get((req,res)=> res.send('Usuarios Ruta'))
//router.route('/').get((req,res)=> res.json({message: 'Get Request'}))
//router.route('/').post((req,res)=> res.json({message: 'Post Request'}))



// ruta con parametro
router.route('/:id')
       .get(getPro)
        .put(updatePro)
       .delete(deletePro);

module.exports = router;