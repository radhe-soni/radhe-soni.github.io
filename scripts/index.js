"use strict";
const printRows = new PrintRows();
const printColumns = new PrintColumns();
function loader() {
	const printable = document.getElementById('printable');
	printRows.rows.push(new PrintRow(printRows.rows.length));
	
	const headerRow = getHeaderRow();
	printable.appendChild(headerRow);
	printColumns.columns.map(columnInfo => getHeaderCell(columnInfo))
		.forEach(cell => headerRow.appendChild(cell));
	
	const firstRow = createTableRow(0);
	printColumns.columns.map(columnInfo => getNewCell(columnInfo))
		.forEach(cell => firstRow.appendChild(cell));
	
	const dataGroupRow = getDataGroup('printable');
	printable.appendChild(dataGroupRow);
	dataGroupRow.appendChild(firstRow);
	
	addListeners();
}
function setFieldsWithSelectedRow(rowIndex){
	const selectedRow = printRows.rows[rowIndex];
	selectedRow.resetFeilds(inputMap);
	printRows.currentRow = selectedRow.sno;
	console.log(rowIndex);
	console.log(rowIndex + selectedRow);
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
const cells = {}

function updateWeightUnits() {
	
	const unitSelection = this;
	const itemId = unitSelection.id;
	const header = document.getElementById(printRows.generateHeaderCellId(itemId.replace('Unit', '')));
	printRows.getCurrentRow()[itemId] = unitSelection.value;
	header.innerHTML = getColumnName(itemId, printColumnMap[itemId.replace('Unit', '')].name);
	updateSubTotal();
	updateGrandTotal()
}
function updatePrintObj() {
	const calculatable = this;
	const itemId = calculatable.id;
	const itemValue = typeof calculatable.value === "string" ? calculatable.value : parseFloat(calculatable.value);
	printRows.getCurrentRow()[itemId] = itemValue;
	updatePrintItem(itemId);
}
function populatePrintHeader(element) {
	const printHeaderId = element.id+'Print';
	document.getElementById(printHeaderId).innerText=element.value;
}
function printTheTable() {
	const printHeaderInputs = document.getElementsByClassName('print-header-input');
	for (var i = 0; i < printHeaderInputs.length; i++) {
		populatePrintHeader(printHeaderInputs[i]);
	}
	const billInfo = document.getElementById('billInfo');
	const customerCopy = billInfo.cloneNode(true);
	const billInfoParent = billInfo.parentElement;
	const original = billInfoParent.innerHTML;
	
	const sellerDiv = document.createElement('div');
	sellerDiv.classList.add('row');
	sellerDiv.innerText='Seller Copy';
	billInfo.insertBefore(sellerDiv, billInfo.firstChild);

	const customerDiv = document.createElement('div');
	customerDiv.classList.add('row');
	customerDiv.innerText='Customer Copy';
	customerCopy.insertBefore(customerDiv, customerCopy.firstChild);
	billInfoParent.appendChild(customerCopy);
	window.print();
	setTimeout(function(){ billInfoParent.innerHTML = original; }, 1500);
	
}
function addNewItem() {
	const newPrintRow = new PrintRow(printRows.rows.length);
	printRows.rows.push(newPrintRow);
	printRows.currentRow = newPrintRow.sno;
	newPrintRow.resetFeilds(inputMap);
	const printable = document.getElementById('printableDataGroup');
	const newRow = createTableRow(newPrintRow.index);
	printable.appendChild(newRow);
	printColumns.columns.map(columnInfo => getNewCell(columnInfo))
		.forEach(cell => newRow.appendChild(cell));
	
}
function getFormattedDate(date) {
	return date.getFullYear()
		+ "-"
		+ ("0" + (date.getMonth() + 1)).slice(-2)
		+ "-"
		+ ("0" + date.getDate()).slice(-2);
}
var calculatables = document.getElementsByTagName('input');
var inputMap = getInputMap();
function getInputMap() {
	let inputMap = {};
	for (var i = 0; i < calculatables.length; i++) {
		inputMap[calculatables[i].id] = calculatables[i];
		inputMap[calculatables[i].id + '_next'] = calculatables[i + 1 < calculatables.length ? i + 1 : 0];
	}
	return inputMap;
}
$('input').keypress(e => gotoNextField(e));
function gotoNextField(e){
	if (e.which == 13) {
		$(e.target).blur();
		let nextElement = inputMap[e.target.id + '_next'];
		if(nextElement){
			nextElement.focus();
		}
	}
}