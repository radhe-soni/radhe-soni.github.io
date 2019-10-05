"use strict";
const printRows = new PrintRows();
const printColumns = new PrintColumns();
function loader() {
	const printable = document.getElementById('printable');
	// new PrintRow(printRows.rows.length + 1)
	printRows.rows.push(new PrintRow(printRows.rows.length + 1));
	const headerRow = getHeaderRow();
	printable.appendChild(headerRow);
	printColumns.columns.map(columnInfo => getHeaderCell(columnInfo))
		.forEach(cell => headerRow.appendChild(cell));
	const firstRow = createTableRow();
	printable.appendChild(firstRow);
	printColumns.columns.map(columnInfo => getNewCell(columnInfo))
		.forEach(cell => firstRow.appendChild(cell));
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
const cells = {}

function updateWeightUnits() {
	const unitSelection = this;
	const itemId = unitSelection.id;
	printRows.getCurrentRow()[itemId] = unitSelection.value;
	updateSubTotal();
}
function updatePrintObj() {
	const calculatable = this;
	const itemId = calculatable.id;
	const itemValue = typeof calculatable.value === "string" ? calculatable.value : parseInt(calculatable.value);
	printRows.getCurrentRow()[itemId] = itemValue;
	updatePrintItem(itemId);
}
function printTheTable() {
	window.print();
}
function addNewItem() {
	const printable = document.getElementById('printable');
	const newRow = createTableRow();
	printable.appendChild(newRow);
	const newPrintRow = new PrintRow(printRows.rows.length + 1);
	printRows.rows.push(newPrintRow);
	printRows.currentRow = newPrintRow.index;
	newPrintRow.resetFeilds(inputMap);
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
var calculatables = document.getElementsByClassName('calculatable');
var inputMap = getInputMap();
function getInputMap() {
	let inputMap = {};
	for (var i = 0; i < calculatables.length; i++) {
		inputMap[calculatables[i].id] = calculatables[i];
		inputMap[calculatables[i].id+'_next'] = calculatables[i + 1 < calculatables.length ? i + 1 : 0];
	}
	return inputMap;
}
$('.calculatable').keypress(function (e) {
	if (e.which == 13) {
		$(this).blur();
		inputMap[this.id+'_next'].focus();
	}
});