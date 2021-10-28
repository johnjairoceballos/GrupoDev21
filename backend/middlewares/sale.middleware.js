
const {sale_model} = require('../models');
const joi = require('@hapi/joi').extend(require('@hapi/joi-date'));;




verifyTypes = (req, res, next) => {
    const sale_joi = joi.object({
        _id: joi.optional(),
        id_sale: joi.string().required(),
        description_sale: joi.string().required(),
        sellername: joi.string().required(),
        sellerlastname: joi.string().required(),
        state: joi.string().required(),
        total_sale: joi.number(),
        send_date: joi.date().format('DD/MM/YYYY').utc(),
        delivery_date: joi.date().format('DD/MM/YYYY').utc(),
        products_sale: joi.string()
    });

    const {error} = sale_joi.validate(req.body);
    if(error) return res.status(400).json({error:true, mensaje: error.details[0].message});
    next()
}


module.exports = Object.freeze({
    verifyTypes,
    
});
