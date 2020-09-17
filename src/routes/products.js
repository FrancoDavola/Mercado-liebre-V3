// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path')
// ************ Controller Require ************
const productsController = require('../controllers/productsController');
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/products')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })



router.get('/', productsController.root); /* GET - All products */
router.get('/detail/:id/', productsController.detail); /* GET - Product detail */

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); /* GET - Form to create */
router.post('/create/', upload.any() ,  productsController.store); /* POST - Store in DB */

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); /* GET - Form to create */
router.put('/edit/:id', productsController.update); /* PUT - Update in DB */

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); /* DELETE - Delete from DB */

module.exports = router;
