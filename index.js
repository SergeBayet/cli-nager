#!/usr/bin/env node
const { getCode, getName } = require("country-list");
const axios = require("axios");

let myArgs = process.argv.slice(2);
let country = myArgs[0] || 'Belgium';
let date = myArgs[1] || new Date().getFullYear();
let codeCountry = getCode(country);

if (codeCountry == undefined) {
	console.log('Country "' + country + '" doesn\'t exist');
	process.exit(1);
}

console.log('Holydates in ' + country + ' (' + codeCountry + ') for the year ' + date + '\n\r');

// https://date.nager.at/api/v2/publicholidays/2017/AT

axios.get('https://date.nager.at/api/v2/publicholidays/' + date + '/' + codeCountry)
	.then(res => {

		prettyPrint(res.data);

	})
	.catch(err => {
		console.log('An error occured. Sorry! Maybe the country is not available on date.nager API!');
	})
	.finally(() => {
		console.log('\n\rThanks for using holydates!')
	});

prettyPrint = (data) => {
	data.forEach(el => {
		console.log(el.date + ' : ' + el.name);
	});
};