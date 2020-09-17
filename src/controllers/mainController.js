const fs = require('fs');
const path = require('path');
const archivo = require('../data/productsDataBase.json')

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: function (req, res) {

		let ultiVisitados = archivo.filter(function (producto) {
			return producto.category == "visited"
		})


		let oferton = archivo.filter(function (producto) {
			return producto.category == "in-sale"
		})



		res.render('index', {
			visitados: ultiVisitados,
			oferta: oferton,
			toThousand
		})
	},
	search: (req, res) => {

		let busqueda = req.query.keywords





		let nuevo = archivo.filter(function (producto) {

			if (producto.name.indexOf(busqueda) >= 0) {
				return producto
			}
		})






		res.render('results', {
			resultado: nuevo,
			toThousand
		})

	},
};

module.exports = controller;


/* req.query.keywords */