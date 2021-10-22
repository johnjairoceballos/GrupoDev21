const ProductsCtrl = {}

const Product = require('../models/Product');


ProductsCtrl.getPros = async (req,res)=> {
    const products = await Product.find();
    //  res.json({message: []});
    res.json(products)
}


ProductsCtrl.createPro = async (req,res)=> {
// res.json({title: 'dgsdgsdgsd' });
    const { producto, 
            descripcion, 
            autor} = req.body;
    // console.log(test);

const newProd = new Product({
    producto: producto,
    descripcion: descripcion,
    autor: autor
});
    await newProd.save();
    console.log(newProd);
    res.json({message: 'Procto Save'})
}

ProductsCtrl.getPro = async (req,res)=> {
    const pro = await Product.findById(req.params.id);
    // console.log(pro);
    res.json(pro);
}

ProductsCtrl.createUser = (req,res)=> res.json({message: 'User saved'});

ProductsCtrl.updatePro =  async (req,res)=> {
    console.log(req.params.id, req.body);
    // Product.findByIdAndUpdate(req.params.id, req.body); se puede hacer asi 
    //segunda forma
    const { producto, 
        descripcion, 
        autor} = req.body;
    // await Product.findIdAndUpdate(req.params.id,{ se puede asi tambien
        await Product.findOneAndUpdate({_id:req.params.id},{
        producto: producto,
        descripcion: descripcion,
        autor: autor
    });

    res.json({message: 'Pro Update*'});
}


ProductsCtrl.deletePro = async (req,res)=>{
    await Product.findByIdAndDelete(req.params.id);
    res.json({message: 'Producto Delete*'});
} 



module.exports = ProductsCtrl