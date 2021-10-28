const {sale_model} = require('../models');

getAllSales = (req, res) => {
    sale_model.find().exec((error, sales) => {
        if(error) return res.status(500).json({error: true, mensaje: error});
        res.json({sales});
    })
}

addSale = (req, res) => {
    const sale_new = new sale_model(req.body);
    sale_new.save((error, sale) => {
        if(error) return res.status(500).json({error:true, mensaje: error})
        res.json({mensaje: req.body.description + " agregado satisfactoriamente"})
    })
}

deleteSale = async (req, res) => {
    const sale_delete = await sale_model.findByIdAndDelete({_id: req.params.id})

    try{
        if(sale_delete) return res.json({mensaje: sale_delete.description + " eliminado correctamente"});
        else return res.status(500).json({error: true, mensaje: "Falla al eliminar"});
    }catch(error){
        return res.staus(500).json({error:true, mensaje: error})
    }
}

updateSale = async (req, res) => {
    try{
        const sale_update = await sale_model.findByIdAndUpdate({_id: req.body._id}, req.body, {useFindAndModify: false});
        if(sale_update) return res.json({mensaje: "Usuario actualizado correctamente"});
        else return res.status(400).json({error: true, mensaje: "Falla al actualizar"})
    }catch(error){
        if(error) return res.status(500).json({error: true, mensaje: error});
    }
}

module.exports = Object.freeze({
    getAllSales,
    addSale,
    deleteSale,
    updateSale
})