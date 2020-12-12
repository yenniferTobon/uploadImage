const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const newId = uuidv4();
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, newId + path.extname(file.originalname));
    }
});

module.exports = multer({ storage });