const express = require('express');
const router = express.Router();
const placeController = require('../controllers/place.controller')
const multer = require('multer');

// detailed configuration of storage
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./uploads')
    },
    filename: function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g,'-')+ file.originalname)
    } 
});
const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }
    else{
        cb(new Error('Please upload only jpg/png files'),false);
    }
}
// destination of the image to be stored.
const upload = multer({storage:storage,limits:{
    fileSize: 1024 * 1024 * 5
},
fileFilter:fileFilter
});

router.post('/', upload.single('photo'),placeController.post_place);
router.get('/',placeController.get_all_places);
router.get('/:id',placeController.get_place_details);
router.patch('/:id',placeController.patch_place);
router.delete('/:id',placeController.delete_place);

module.exports = router;