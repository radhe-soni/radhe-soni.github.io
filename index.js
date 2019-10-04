"use strict";
function loader() {
	const printable = document.getElementById('printable');
	Object.entries(printColumns).map(entry => entry[0])
		.map(getNewColumn)
		.forEach(column => printable.appendChild(column));
	addListeners();
}
function addListeners() {
	var calculatables = document.getElementsByClassName('calculatable');
	for (var i = 0; i < calculatables.length; i++) {
		calculatables[i].addEventListener('input', updatePrintObj);
	}
	var weightUnits = document.getElementsByClassName('weight-unit');
	for (var i = 0; i < weightUnits.length; i++) {
		weightUnits[i].addEventListener('change', updateWeightUnits);
	}
}
function getNewColumn(item) {
	const column = document.createElement('ul');
	printColumns[item].column = column;
	column.classList.add('list-group');
	column.classList.add('list-group-custom');
	column.appendChild(getHeaderCell(item));
	column.appendChild(getNewCell(item));
	return column;
}
function getHeaderCell(item) {
	const columnNameCell = document.createElement('li');
	columnNameCell.innerHTML = printColumns[item].name;
	columnNameCell.classList.add('list-group-item');
	columnNameCell.classList.add('list-group-item-custom');
	return columnNameCell;
}
function getNewCell(item) {
	const cell = document.createElement('li');
	cell.innerHTML = printItemObj[item];
	cell.classList.add('list-group-item');
	cell.classList.add('list-group-item-custom');
	const cellId = item + 'cell' + 1;
	cells[cellId] = cell;
	return cell;
}
const unitMultiplier = {
	gram: 0.001,
	tola: 0.01,
	milligram: 0.000001,
	kilo: 1
}
const printItemObj = {
	itemName: 'Gold Fine',
	rate: 0,
	rateUnit: "tola",
	weight: 0,
	weightUnit: "gram",
	purity: 100,
	pieces: 0,
	wastage: 0,
	wastageUnit: "milligram",
	labour: 0,
	sumTotal: 0,
	labourUnit: "kilo",
	get total() {
		this.sumTotal = (this.rate / unitMultiplier[this.rateUnit]) *
			((unitMultiplier[this.weightUnit] * this.weight * this.purity / 100)
				+ (this.pieces * this.wastage * unitMultiplier[this.wastageUnit])) + (this.labour / unitMultiplier[this.labourUnit]);
		return this.sumTotal;
	},
	get sno() {
		return printColumns.sno.column.children.length;
	},
	get index() {
		return this.sno - 1;
	}
}
const printItemObjs = [];
const getprintItemObjSequence = () => {
	let i = 0;
	return {
		quantity: i++,
		rate: i++,
		weight: i++,
		purity: i++,
		wastage: i++,
		labour:i++,
		sumTotal:i++
	}
}
const printItemObjSequence = getprintItemObjSequence();
const cells = {}
const printColumns = getPrintColumns();
function getPrintColumns() {
	return {
		sno: {
			name: 'S.No.',
			class: 'col-md-1'
		},
		itemName: {
			name: 'Item Name',
			class: 'col-md-2'
		},
		pieces: {
			name: 'Pieces',
			class: 'col-md-2'
		},
		rate: {
			name: 'Rate',
			class: 'col-md-2'
		},
		weight: {
			name: 'Weight',
			class: 'col-md-2'
		},
		purity: {
			name: 'Purity',
			class: 'col-md-1'
		},
		
		wastage: {
			name: 'Wastage',
			class: 'col-md-2'
		},
		labour: {
			name: 'Labour',
			class: 'col-md-2'
		},
		total: {
			name: 'Total',
			class: 'col-md-2'
		}
	}
}
function updateWeightUnits() {
	const unitSelection = this;
	const itemId = unitSelection.id;
	printItemObj[itemId] = unitSelection.value;
	updateSubTotal();
}
function updatePrintObj() {
	const calculatable = this;
	const itemId = calculatable.id;
	printItemObj[itemId] = typeof calculatable.value === "string" ?  parseInt(calculatable.value) : calculatable.value;
	updatePrintItem(itemId);
}
function createNewPrintItem(itemId) {
	const column = printColumns[itemId].column;
	const index = column.getElementsByTagName('li').length;
	const cellId = itemId + 'cell' + index;
	const cell = document.createElement('li');
	cell.classList.add('list-group-item');
	cell.classList.add('list-group-item-custom');
	cell.setAttribute('id', cellId);
	cells[cellId] = cell;
	cell.innerHTML = printItemObj[itemId];
	column.appendChild(cell);

	return index;
}

function updatePrintItem(itemId) {
	let cellId = itemId + 'cell' + printItemObj.index;
	let cell = cells[cellId];
	cell.innerHTML = printItemObj[itemId];
	updateSubTotal();
}
function updateSubTotal() {
	let cellId = 'totalcell' + printItemObj.index;
	let cell = cells[cellId];
	cell.innerHTML = printItemObj.total;
}

function moveUp(element) {
	console.log("moving element up");
	if (element.previousElementSibling)
		element.parentNode.insertBefore(element, element.previousElementSibling);
	return Array.from(element.parentNode.children).indexOf(element);
}
function moveDown(element) {
	console.log("moving element down");
	if (element.nextElementSibling)
		element.parentNode.insertBefore(element.nextElementSibling, element);
	return Array.from(element.parentNode.children).indexOf(element);
}
function printTheTable() {
	window.print();
}
function addNewItem() {

}