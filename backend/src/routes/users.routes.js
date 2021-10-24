const {Router}=require('express');
const { getUsers, getUser, createUser, updateUser, deleteUser, getCorreo } = require('../controllers/users.controllers');
const router = Router()
const UsersCtrl = require('../controllers/users.controllers')

//desde controllers

router.route('/')
    .get(getUsers)
    .post(createUser);


//router.route('/').get((req,res)=> res.send('Usuarios Ruta'))
//router.route('/').get((req,res)=> res.json({message: 'Get Request'}))
//router.route('/').post((req,res)=> res.json({message: 'Post Request'}))



// ruta con parametro
router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);
//      .get((req,res)=> res.json({title:'datos consultados'}))
//      .post()
//      .put((req,res)=> res.json({message: 'Nota updated'}))
//      .delete((req,res)=> res.json({message: 'Nota Deleted'}))

router.route('/correo/:email')
    .get(getCorreo);



module.exports = router;