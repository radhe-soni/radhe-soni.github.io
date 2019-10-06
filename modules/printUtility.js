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
function createTableRow() {
	const row = document.createElement('div');
	row.classList.add('resp-table-row');
	
	return row;
}
function getHeaderCell(columnInfo) {
	const headerCell = document.createElement('div');
	const columnName = getColumnName(columnInfo.itemId+'Unit', columnInfo.name);
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
	cell.innerHTML = printRows.getCurrentRow()[itemId];
	updateSubTotal();
	updateGrandTotal();
}
function updateSubTotal() {
	let cellId = printRows.getCurrentCellId('total');
	let cell = cells[cellId];
	cell.innerHTML = printRows.getCurrentRow().total;
}
function updateGrandTotal(){
	const grandTotal = document.getElementById('grandTotal');
	grandTotal.innerText = printRows.grandTotal();
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