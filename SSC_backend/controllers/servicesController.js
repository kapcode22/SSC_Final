///variabke to save service model
const servicesModel = require('../models/servicesModel')
const jwt = require('jsonwebtoken')
const adminModel = require('../models/adminModel');
// if you want to display it on frontend first you have to get it from backend 
// using getservices controller
module.exports.getServices = async (req, res) => {
    // we can find title email, desc, any thing  u want 
    // if u pass it as empty it will return all object in table
    const _data = await servicesModel.find({})
    if (_data) {
        return res.send({ code: 200, message: 'success', data: _data })
    }
    else {
        return res.send({ code: 500, message: 'service error' })
    }


}




module.exports.addServices = async (req, res) => {
    
    try {
        if (!req.headers.authorization) {
            return res.status(403).send({ code: 403, message: "No Token" });
        }

        const token = req?.headers?.authorization;
        const userDetail = await jwt.verify(token, 'SSC_123');

        if (userDetail._doc.type !== 'SUBADMIN' && userDetail._doc.type !== 'ADMIN') {
            return res.status(403).send({ code: 403, message: 'Unauthorized.' });
        }

        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (userDetail.exp < currentTime) {
            return res.status(403).send({ code: 403, message: 'Token Expired' });
        }

        const title = req.body.title;
        const description = req.body.description;
        const imageUrl=req.file.path
        if (!title || !description || !imageUrl) {
            return res.status(400).send({ code: 400, message: 'Bad Request' });
        }

        const new_services = new servicesModel({ title:title, description:description,imageUrl:imageUrl });
        const success = await new_services.save();

        if (success) {
            return res.status(200).send({ code: 200, message: 'Add success' });
        } else {
            return res.status(500).send({ code: 500, message: 'Service error' });
        }
    } catch (err) {
        return res.status(500).send({ code: 500, message: 'Internal error' });
    }
}
