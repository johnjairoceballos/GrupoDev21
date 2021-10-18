const UsersCtrl = {}

const User = require('../models/User');

UsersCtrl.getUsers = async (req,res)=> {
    const users = await User.find();
    res.json(users)
}


UsersCtrl.getUser = async (req,res)=>{
    const user = await User.findById(req.params.id);
    res.json({
        user,
        mensaje : 'Usuario encontrado'
    })
}

UsersCtrl.createUser =  async (req,res)=> {
    const {username, userlastname, email, rol,estado} = req.body;
    const newUser = new User({username, userlastname, email, rol,estado})
    await newUser.save();
    res.json({
        mensaje:'Usuario Crado'
    });
    
}

 UsersCtrl.updateUser = async (req,res)=> {
    console.log(req.params.id, req.body);
    // Product.findByIdAndUpdate(req.params.id, req.body); se puede hacer asi 
    //segunda forma
    const { username, userlastname, email, rol,estado } = req.body;
    // await Product.findIdAndUpdate(req.params.id,{ se puede asi tambien
        await User.findOneAndUpdate({_id:req.params.id},{
        username:username,
        userlastname : userlastname,
        email: email,
        rol:rol,
        estado:estado
        
    });

    res.json({
        mensaje:'Usuario Actualizado'
    });
 }
 

 UsersCtrl.deleteUser = async (req,res)=> {
    await User.findByIdAndDelete(req.params.id);
    res.json({
    mensaje:'Usuario eliminado'
    });
 }

module.exports = UsersCtrl