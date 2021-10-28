const {product_model} = require('../models');
const joi = require('@hapi/joi');

verifyTypes = (req, res, next) => {
    const product_joi = joi.object({
        _id: joi.optional(),
        barcode: joi.number().required(),
        description: joi.string().required(),
        unit_cost: joi.number().required(),
        state: joi.boolean().optional()
    });

    const {error} = product_joi.validate(req.body);
    if(error) return res.status(400).json({error:true, mensaje: error.details[0].message});
    next()
}

verifyBarcode = (req, res, next) => {
    product_model.findOne({barcode: req.body.barcode}).exec((error, product) => {
        if(error) return res.status(500).json({error: true, mensaje: error});
        if(product) return res.status(400).json({error:true, mensaje: product.description + " está registrado con el código de barras " + product.barcode});
        next();
    });
}

module.exports = Object.freeze({
    verifyTypes,
    verifyBarcode
});