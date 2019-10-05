function getHeaderRow() {
	const row = document.createElement('div');
	row.classList.add('resp-table-header');
	return row;
}
function getTableRow() {
	const row = document.createElement('div');
	row.classList.add('resp-table-row');
	return row;
}
function getHeaderCell(columnInfo) {
	const headerCell = document.createElement('div');
	headerCell.innerHTML = columnInfo.name;
	headerCell.classList.add('table-header-cell');
	return headerCell;
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
}
function updateSubTotal() {
	let cellId = 'totalcell' + printRows.currentRow;
	let cell = cells[cellId];
	cell.innerHTML = printRows.getCurrentRow().total;
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