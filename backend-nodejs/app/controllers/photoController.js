const photoServi = require('../services/photoService');
const ReqFieldException = require('../exceptions/ReqFieldException');
const ExceptionGeneral = require('../exceptions/ExceptionGeneral');
const Photo = require('../models/photoModels');

exports.uploadPhoto = async(req, res) => {
    console.log("Entro al Back");
    let path = req.file.path,
        new_width = 0,
        new_height = 0,
        jsonResp = new Object();
    let photo_dimensions = await photoServi.getSizePhoto(path);
    let new_dimensions = await photoServi.calculateNewImageValues(path, photo_dimensions);
    new_height = new_dimensions.height_new;
    new_width = new_dimensions.width_new;
    console.log(new_dimensions);
    if (new_dimensions.change_img === true) {
        console.log("entro al if");
        console.log(new_width);
        console.log(path);
        photoServi.changeSizeNewPhoto(path, new_width, new_height);
    }
    console.log("cambio la dimension");
    jsonResp.photoPath = path;
    console.log(jsonResp.photoPath);
    jsonResp.title = req.body.title;
    jsonResp.photo_height = photo_dimensions.height;
    jsonResp.photo_width = photo_dimensions.width;
    jsonResp.new_height = new_height;
    jsonResp.new_width = new_width;
    let photo_finish = await photoServi.saveInfoBD(jsonResp);
    console.log(photo_finish);
    console.log("sin Bd");
    res.status(200).send(photo_finish);
}

exports.getInfoPhoto = async(req, res) => {
    const { id } = req.params;
    const photo = await Photo.findById(id);
    return res.json(photo);
}