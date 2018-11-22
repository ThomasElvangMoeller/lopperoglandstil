const controller = require("../../controllers/controller");
const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: function (request, file, callback) {
        callback(null, file.originalname +'-'+Date.now())
    }
})
const upload = multer({storage: storage})



// TODO
router.get('/', function (req, res) {
    //Get all pictures in storage
    res.send(`All pictures`);
})

// TODO
router.get('/:id', function (req, res) {
    //Get information on specific picture
    res.send(`Specific picture`);
});

router.post('/', upload.single('product'), (req, res) => {
    if(!req.file){
        console.log('no file found');
        return res.send({success:false})
    }
    else{
        console.log('file uploaded');
        return res.send({success:true})
    }
    //Add a specific picture to the database
    //picture details specified in post request body in json
});

module.exports = router;
