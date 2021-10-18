const PruebaCtrl ={}

PruebaCtrl.obtener = (req, res)=>{
    res.send('funcionando')
}

PruebaCtrl.crear = (req,res)=>{
    res.send('funcionando crear')
}

PruebaCtrl.actualizar=(req,res)=>{
    res.send('Funcionando desde PUT')
}

PruebaCtrl.eliminar=(req,res)=>{
    res.send('funcionando desde eliminar')
}


module.exports = PruebaCtrl