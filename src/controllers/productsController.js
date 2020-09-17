const fs = require('fs');
const path = require('path');
const archivo = require('../data/productsDataBase.json')
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res) => {
		let allProducts = archivo.filter(function (producto) {
			return producto
		})


		res.render('products', {
			productos: allProducts,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let allProducts = archivo.find(function (producto) {
			return producto.id == req.params.id
		})

		let precio = allProducts.price * allProducts.discount

		let descuento = precio / 100

		let precioFinal = allProducts.price - descuento

		console.log(precioFinal)



		res.render('detail', {
			productos: allProducts,
			precio: precioFinal,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {

		res.render('product-create-form')
	},

	// Create -  Method to store
	store: (req, res, next) => {

		var numero = Math.floor(Math.random() * 1000)

		let noEsta = archivo.find(function (producto) {
			if (producto.id != numero) {

				return producto
			}
		})

		if (noEsta) {

			req.body.id = numero

			archivo.push(req.body, req.body.image = req.files[0].filename)

			fs.writeFileSync(productsFilePath, JSON.stringify(archivo, null, 4))
		} else {


			console.log("ERROR, id en uso")
		}

		console.log(req.body)

		res.redirect("/")
	},


	// Update - Form to edit
	edit: (req, res) => {

		let allProducts = archivo.find(function (producto) {
			return producto.id == req.params.id
		})



		res.render('product-edit-form', {
			productos: allProducts
		})

	},
	// Update - Method to update
	update: (req, res) => {

		let productoEditados = archivo.map(function (producto) {
			if (producto.id == req.params.id) {
				return {
					...producto,
					...req.body
				}
			}

			return producto
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(productoEditados, null, 4))


		res.redirect("/")
	},

	// Delete - Delete one product from DB


	destroy: (req, res) => {

		let eliminados = archivo.filter(function (producto) {
			if (producto.id != req.params.id) {
				return producto
			}
		})

		console.log(eliminados)

		fs.writeFileSync(productsFilePath, JSON.stringify(eliminados, null, 4))


		res.render('eliminado')
	},


};

module.exports = controller;