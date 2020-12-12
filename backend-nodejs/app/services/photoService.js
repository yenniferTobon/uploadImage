const photoModel = require('../models/photoModels');
const sizeOf = require('image-size');
const config = require('../configs/config');
var Jimp = require('jimp');

exports.getSizePhoto = async(photoPath) => {
    const dimensions = sizeOf(photoPath);
    return dimensions;
};

exports.calculateNewImageValues = async(photoPath, photo_dimensions) => {
    let width_hoja = config.WIDTH_HOJA,
        height_hoja = config.HEIGHT_HOJA,
        width_img = 180,
        height_img = 70,
        percentage = 0,
        height_new = 0,
        width_new = 0;
    change_img = new Boolean(false);
    let jsonResp = new Object();

    height_img = photo_dimensions.height;
    width_img = photo_dimensions.width;
    console.log("========================");
    console.log("Info de la imagen");
    console.log("Alto: " + height_img);
    console.log("Ancho: " + width_img);
    console.log("========================");
    console.log("Info de la hoja");
    console.log("Alto: " + height_hoja);
    console.log("Ancho: " + width_hoja);
    console.log("========================");

    if (((width_img <= width_hoja) && (height_img <= height_hoja)) || (width_img <= height_hoja && height_img <= width_hoja)) {
        jsonResp.change_img = false;
        jsonResp.height_new = height_img;
        jsonResp.width_new = width_img;
        console.log("La imagen no Cambio");
        return jsonResp;
    }



    /************************************************************************
     * Imagen esta horizontal y debo de rotar la hoja.
     ************************************************************************/
    if (width_img > height_img && width_img > width_hoja) {
        /*******************************************************************
         * Encontrar si el cambio de tamaño esta mayor en el ancho o alto 
         * de la imagen. 
         *******************************************************************/
        if (width_img - height_hoja > height_img - width_hoja) {
            percentage = (Math.ceil((((width_img - height_hoja) * 100) / width_img))) / 100;
        } else {
            percentage = (Math.ceil((((height_img - width_hoja) * 100) / height_img))) / 100;
        }
        /************************************************************************
         * Imagen esta vertical.
         ************************************************************************/
    } else {
        /*******************************************************************
         * Encontrar si el cambio de tamaño esta mayor en el ancho o alto 
         * de la imagen. 
         *******************************************************************/
        if (width_img - width_hoja > height_img - height_hoja) {
            percentage = (Math.ceil((((width_img - width_hoja) * 100) / width_img))) / 100;
        } else {
            percentage = (Math.ceil((((height_img - height_hoja) * 100) / height_img))) / 100;
        }
    }

    width_new = width_img - (width_img * percentage);
    height_new = height_img - (height_img * percentage);
    console.log("++++++++++++++++++++++++++++++++");
    console.log("Resultado final");
    console.log("  %: " + percentage);
    console.log("  New Alto: " + height_new);
    console.log("  New Ancho: " + width_new);
    console.log("++++++++++++++++++++++++++++++++");
    jsonResp.change_img = true;
    jsonResp.height_new = height_new;
    jsonResp.width_new = width_new;
    console.log(jsonResp);
    return jsonResp;
};

exports.changeSizeNewPhoto = async(photo, width, height) => {
    console.log("Entro a este metodo");
    const photoNew = await Jimp.read(photo);
    await photoNew.resize(width, height);
    await photoNew.quality(100);
    await photoNew.writeAsync(photo);
}

exports.saveInfoBD = async(jsonResp) => {
    const recentPhoto = photoModel(jsonResp);
    let addImage = await recentPhoto.save();
    return addImage;
}