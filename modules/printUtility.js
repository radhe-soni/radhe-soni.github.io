function getDataGroup(parentId) {
	const row = document.createElement('div');
	row.classList.add('table-row-group');
	row.id = parentId+'DataGroup';
	return row;
}
function getHeaderRow() {
	const row = document.createElement('div');
	row.classList.add('resp-table-header');
	return row;
}
function getFooterRow() {
	const row = document.createElement('div');
	row.classList.add('resp-table-footer');
	return row;
}
function getGrandTotalRow() {
	const group = document.createElement('div');
	group.classList.add('table');
	let row = document.createElement('div');
	row.classList.add('resp-table-row');
	group.appendChild(row);
	let cell = document.createElement('div');
	cell.classList.add('table-body-cell');
	cell.innerText = "Grand Total";
	row.appendChild(cell);
	cell = document.createElement('div');
	cell.classList.add('table-body-cell');
	cell.id='grandTotal';
	cell.innerText=0;
	row.appendChild(cell);
	return row;
}
function createTableRow(index) {
	const row = document.createElement('div');
	row.classList.add('resp-table-row');
	row.classList.add('data-table-row');
	row.setAttribute("data-toggle", "tooltip");
	row.setAttribute("data-placement", "top");
	row.setAttribute("title", "Click on the row to edit !!!");
	row.addEventListener('click', () => setFieldsWithSelectedRow(index));
	row.setAttribute('id', 'dataRow'+ index);
	return row;
}
function getHeaderCell(columnInfo) {
	const headerCell = document.createElement('div');
	const columnName = columnInfo.name;
	headerCell.innerHTML = columnName;
	headerCell.id = printRows.generateHeaderCellId(columnInfo.itemId);
	headerCell.classList.add('table-header-cell');
	return headerCell;
}
function getColumnName(itemId, name){
	let unitSymbol = `(${printRows.rows[0].getUnitSymbol([itemId])})`;
	if(unitSymbol == '(undefined)'){
		unitSymbol='';
	}
	return `${name} ${unitSymbol}`;
}
function getNewCell(columnInfo) {
	const cell = document.createElement('div');
	cell.innerHTML = printRows.rows[printRows.rows.length - 1][columnInfo.itemId];
	cell.classList.add('table-body-cell');
	const cellId = printRows.generateCellId(columnInfo.itemId);
	cells[cellId] = cell;
	return cell;
}
function updatePrintItem(itemId) {
	let cellId = printRows.getCurrentCellId(itemId);
	let cell = cells[cellId];
	cell.innerHTML = printRows.getCurrentRow()[itemId] + getUnitSymbol(itemId);
	updateSubTotal();
	updateGrandTotal();
}
function getUnitSymbol(itemId){
	let unitSymbolString = '';
	const unitSymbol = printRows.getCurrentRow().getUnitSymbol(itemId);
	if(unitSymbol){
		const unitSymbolSpan = document.createElement('span');
		unitSymbolSpan.classList.add('unit-symbol');
		unitSymbolSpan.innerText = `(${unitSymbol})`;
		unitSymbolString = unitSymbolSpan.outerHTML;
	}
	return unitSymbolString;
}
function updateLabourCharge() {
	let cellId = printRows.getCurrentCellId('labourCharge');
	let cell = cells[cellId];
	cell.innerHTML = printRows.getCurrentRow().labourCharge;
}
function updateSubTotal() {
	let cellId = printRows.getCurrentCellId('total');
	let cell = cells[cellId];
	cell.innerHTML = printRows.getCurrentRow().total;
	updateLabourCharge();
}
function updateGrandTotal(){
	const grandTotalValue = printRows.grandTotal;
	const grandTotal = document.getElementById('grandTotal');
	grandTotal.innerText = grandTotalValue;
	const grandTotalFloating = document.getElementById('grandTotalFloating');
	grandTotalFloating.innerText = grandTotalValue;
	const weightTotal = document.getElementById('weightTotal');
	weightTotal.innerText = printRows.weightTotal + '(kg)';
	const fineWeightTotal = document.getElementById('fineWeightTotal');
	fineWeightTotal.innerText = printRows.fineWeightTotal + '(kg)';
	const labourChargeTotal = document.getElementById('labourChargeTotal');
	labourChargeTotal.innerText = printRows.labourChargeTotal;
}
function createNewPrintItem(itemId) {
	const column = printColumns[itemId].column;
	const index = column.getElementsByTagName('li').length;
	const cellId = printRows.generateCellId(itemId);
	const cell = document.createElement('li');
	cell.classList.add('list-group-item');
	cell.classList.add('list-group-item-custom');
	cell.setAttribute('id', cellId);
	cells[cellId] = cell;
	cell.innerHTML = printItemObj[itemId];
	column.appendChild(cell);

	return index;
}