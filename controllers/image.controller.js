const imageRouter = require('express').Router();
const imageModel = require('../models/Image.models');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, './public/images');
    },
    filename : (req,file,cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage : storage
})

imageRouter.post('/:id', upload.single('file'), (req,res,next) => {
    imageModel.create({name : req.params.id, image : req.file.filename})
        .then(response => {
            res.status(201).json({
                success: true,
                message:  `image upload sucessfully`,
            });
        })
        .catch(err => {
            return res.status(500).json(err);
        })
})

imageRouter.get('/get/:id', (req,res,next) => {
    const name = req.params.id;
    imageModel.findOne({name})
        .then(response => {
            return res.status(200).json({
                result : response,
                success : true,
                message : "image fetch successfully"
            })
        })
        .catch(err => {
            return res.status(401).json({
                success : false,
                message : "image fetch failed",
                Error : err
            })
        })
})


module.exports = imageRouter;