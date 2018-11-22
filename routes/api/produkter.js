const controller = require("../../controllers/controller");
const express = require('express');
const router = express.Router();
const mongooseId = require('mongoose').Types.ObjectId;

const multer = require('multer');
const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: function (request, file, callback) {
        callback(null, mongooseId() + '.jpg')
    }
})
const upload = multer({storage: storage})

// Get all products in storage
router.get('/', async function (req, res) { 
    let products = await controller.getProducts(); 
    res.json(products);
})

// Get information on specific product
router.get('/:id', async function (req, res) {
    let product = await controller.getProduct(req.params.id);
    res.json(product);
});

// Returns an array of all the url paths for the pictures of the product 
router.get('/:id/billeder', async function (req, res) {
    //Get id of all picures for a product
    let product = await controller.getProduct(req.params.id);
    let pictures = [];
    // Creates an array with all the full url paths for the individual pictures (baseurl/uploads/"picture_id".jpg)
    product.pictures.forEach(pic => {pictures.push( req.get('host') + '/uploads/' + pic + '.jpg')})
    res.json(pictures);
});

// Add a specific product to the database
router.post('/', async function (req, res) {
    //product details specified in post request body in json
    try {
        let product = await controller.createProduct(
            req.body.name, 
            req.body.desc, 
            req.body.amount, 
            req.body.categories, 
            req.body.price
        );
        res.send({success:true, id:product._id});
        
    } catch (error) {
        res.send({success:false, error: error});
    }
});

// Add picture/s and adds them to the specified product. returns a list of id's if the files was successfully uploaded
router.post('/:id/uploadbilleder', upload.array('product'), async (req, res) => {
    if(!req.files){
        console.log('no file found');
        return res.send({success:false})
    }
    else{
        console.log('file uploaded');
        let ids = [];
        req.files.forEach(pic => {
            ids.push(pic.filename.substring(0, 24));
        });

        await controller.addPictures(req.params.id, ids);
        return res.send({
            success:true,
            _ids: ids 
        })
    }
});

router.put('/:id', async (req, res) => {
    try {
        await controller.updateProduct(req.params.id, req.body);
        res.json({success: true});
    } catch (error) {
        res.json({success: false, error: error.message});
    }
});

module.exports = router;
