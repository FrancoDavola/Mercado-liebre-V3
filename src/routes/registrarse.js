const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const registrarseController = require('../controllers/registrarseControllers')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/usuarios')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: storage
})




router.get('/', registrarseController.formulario)



router.post('/', upload.any(), registrarseController.registrado)





module.exports = router