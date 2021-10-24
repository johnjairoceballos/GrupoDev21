const router = require('express').Router();
const {user_controller} = require('../controllers');
const {user_middleware} = require('../middlewares');

router.post('/add', user_middleware.verifyTypes, user_controller.addUser );
router.get('/list', user_controller.getAllUsers);
router.put('/update', user_controller.updateUser);
router.delete('/delete/:id', user_controller.deleteUser);
router.get('/:id', user_controller.getUser);
router.get('/email/:email', user_controller.getCorreo);
module.exports = router;
