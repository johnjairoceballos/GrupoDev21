
const {user_model} = require('../models');
const joi = require('@hapi/joi');

verifyTypes = (req, res, next) => {
    const user_joi = joi.object({
        _id: joi.optional(),
        id_user: joi.string().required(),
        username: joi.string().required(),
        userlastname: joi.string().required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        rol: joi.string(),
        estado: joi.string(),
    });

    const {error} = user_joi.validate(req.body);
    if(error) return res.status(400).json({error:true, mensaje: error.details[0].message});
    next()
}


module.exports = Object.freeze({
    verifyTypes,
    
});

