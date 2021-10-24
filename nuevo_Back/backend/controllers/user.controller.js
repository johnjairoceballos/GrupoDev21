const {user_model} = require('../models');

getAllUsers = (req, res) => {
    user_model.find().exec((error, users) => {
        if(error) return res.status(500).json({error: true, mensaje: error});
        res.json({users});
    })
}

addUser = (req, res) => {
    const user_new = new user_model(req.body);
    user_new.save((error, user) => {
        if(error) return res.status(500).json({error:true, mensaje: error})
        res.json({mensaje: req.body.description + " agregado satisfactoriamente"})
    })
}

deleteUser = async (req, res) => {
    const user_delete = await user_model.findByIdAndDelete({_id: req.params.id})

    try{
        if(user_delete) return res.json({mensaje: user_delete.description + " eliminado correctamente"});
        else return res.status(500).json({error: true, mensaje: "Falla al eliminar"});
    }catch(error){
        return res.staus(500).json({error:true, mensaje: error})
    }
}

updateUser = async (req, res) => {
    try{
        const user_update = await user_model.findByIdAndUpdate({_id: req.body._id}, req.body, {useFindAndModify: false});
        if(user_update) return res.json({mensaje: "Usuario actualizado correctamente"});
        else return res.status(400).json({error: true, mensaje: "Falla al actualizar"})
    }catch(error){
        if(error) return res.status(500).json({error: true, mensaje: error});
    }
}

module.exports = Object.freeze({
    getAllUsers,
    addUser,
    deleteUser,
    updateUser
})