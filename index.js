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
const printItemObj = {
	itemName: 'Gold Fine',
	rate: 0,
	rateUnit: "gram",
	weight: 0,
	weightUnit: "gram",
	purity: 100,
	quantityNo: 0,
	wastage: 0,
	wastageUnit: "milligram",
	sumTotal: 0,
	get total() {
		this.sumTotal = this.rate * ((this.weight * this.purity / 100) + (this.quantityNo * this.wastage ));
		console.log(this.sumTotal);
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
		rate: i++,
		weight: i++,
		purity: i++,
		quantity: i++,
		wastage: i++
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
		quantityNo: {
			name: 'Quantity',
			class: 'col-md-2'
		},
		wastage: {
			name: 'Wastage',
			class: 'col-md-2'
		},
		total: {
			name: 'Total',
			class: 'col-md-2'
		}
	}
}
const unitMultiplier = {
	gram: 1,
	tola: 10,
	milligram: 0.001,
	kilo: 1000
}
function updatePrintObj() {
	const calculatable = this;
	const itemId = calculatable.id;
	printItemObj[itemId] = calculatable.value;
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
	cellId = 'totalcell' + printItemObj.index;
	cell = cells[cellId];
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