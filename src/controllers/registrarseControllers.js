const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')
const archivo = require('../data/registroDeUsuarios.json')
/* const productsFilePath = path.join(__dirname, '../data/registroDeUsuarios.json');
const registro = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); */

let registrarseController = {

    formulario: function (req, res) {
        res.render('formularioRegistracion')
    },

    registrado: function (req, res, next) {



        if (req.body.password == req.body.repetPassword) {


            let contraBcr = bcrypt.hashSync(req.body.password, 10)


            req.body.password = contraBcr

            delete req.body.repetPassword




            archivo.push(req.body, req.body.image = req.files[0].filename)

            console.log(req.files[0].filename)



            /* let nuevo = archivo.push(req.body) */

            /* console.log(nuevo) */

            fs.writeFileSync(path.join(__dirname, '../data/registroDeUsuarios.json'), JSON.stringify(archivo, null, 4))

            res.render('sesionDeUsuario', {
                usuario: req.body
            })

        }


        if (req.body.password != req.body.repetPassword) {
            res.render('errorPassword')

        }


    }


}


module.exports = registrarseController