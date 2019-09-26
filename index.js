"use strict";
const printItemObj = {
	rate: 0,
	rateUnit: "gram",
	weight: 0,
	weightUnit: "gram",
	purity: 0,
	quatity: 0,
	wastage: 0,
	wastageUnit: "milligram",
	setRate : (value, printItemId) => {
		this.rate = value;
		let printItemRateEle = document.getElementById(rate+'printItemId');
		printItemRateEle.innerHTML = value;
	}
}
const printObjs = {}
const unitMultiplier = {
	gram: 1,
	tola: 10,
	milligram: 0.001,
	kilo: 1000
}
function updatePrintObj() {
	const calculatable = this;
	
	if (!this['printItemId']) {
		printItemObj[calculatable.id] = calculatable.value;
		console.log(printItemObj);
		const printItemId = createNewPrintItem();
		this['printItemId'] = printItemId;
	} else {
		const printItemId = this['printItemId'];
		const printItem = printObjs[printItemId];
		printItemObj.setRate(calculatable.value, printItemId);
		console.log(printItem);
	}
}
function createNewPrintItem() {
	const printItems = document.getElementById('printItems');
	const printItemsSize = printItems.getElementsByTagName('li').length;
	const printItem = document.createElement('li');
	const printItemId = 'printItem' + printItemsSize;
	printItem.setAttribute('id', printItemId);
	printObjs[printItemId] = printItem;
	printItems.appendChild(printItem);
	let printItemRateEle = document.createElement('div');
	printItemRateEle.setAttribute('id', 'rate'+printItemId);
	printItemRateEle.innerHTML = printItemObj.rate;
	printItem.appendChild(printItemRateEle);
	return printItemId;
}
function addListeners() {
	var calculatables = document.getElementsByClassName('calculatable');
	for (var i = 0; i < calculatables.length; i++) {
		calculatables[i].addEventListener('input', updatePrintObj);
	}
}
