const placeModel = require('../models/place.model')
const mongoose = require('mongoose')

exports.post_place = (req,res) => {
    console.log(req.file);
    const place = new placeModel({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        city: req.body.city,
        country: req.body.country,
        photo: req.file.path,
        time_to_visit: req.body.time_to_visit
    });
    place.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message:"Created Place Successfully"
        })
    })
    .catch(err => {
        console.log(err);
    })
}

exports.get_all_places = (req,res) => {
    placeModel.find()
    .select('_id name city country photo')
    .exec()
    .then(result => {
        const response = {
            count: result.length,
            place: result.map(res => {
                return {
                    _id:res._id,
                    name: res.name,
                    city: res.city,
                    country: res.country,
                    photo: res.photo
                }
            })
        }
        console.log(result);
        res.status(200).json({response})
    })
    .catch(err => {
        console.log("Error while fetching");
        res.status(500).json({
            error:err
        })
    })
}

exports.get_place_details = (req,res) => {
    const id = req.params.id;
    placeModel.findById(id)
    .select('name latitude longitude city country photo time_to_visit')
    .exec()
    .then(result => {
        res.status(200).json({result})
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
}

exports.patch_place = (req,res) => {
    const id = req.params.id;
    const updatePlaces = {};
    for(const placeAttribute of req.body){
        updatePlaces[placeAttribute.propertyName] = placeAttribute.propertyValue;
    }
    placeModel.update({_id:id},{$set:updatePlaces})
    .exec()
    .then(result => {
        res.status(200).send({
            message:"Place updated successfully"
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err.message
        })
    })
}

exports.delete_place = (req,res) => {
    const id = req.params.id;
    placeModel.remove({_id:id}).exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message:"Place deleted successfully"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    })
}