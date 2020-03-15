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

	return `${name}`;
}
function getNewCell(columnInfo) {
	const cell = document.createElement('div');
	cell.innerHTML = printRows.rows[printRows.rows.length - 1][columnInfo.itemId];
	cell.classList.add('table-body-cell');
    const cellId = printRows.generateCellId(columnInfo.itemId);
    cell.id = cellId;
	cells[cellId] = cell;
	return cell;
}
function updatePrintItem(itemId) {
	const cellId = printRows.getCurrentCellId(itemId);
    const cell = cells[cellId];
    highlightChangedElement(cell);
	cell.innerHTML = printRows.getCurrentRow()[itemId];
	updateSubTotal();
	updateGrandTotal();
}

function updateSubTotal() {
	let cellId = printRows.getCurrentCellId('total');
    let cell = cells[cellId];
     highlightChangedElement(cell);
	cell.innerHTML = printRows.getCurrentRow().total;
}
function updateGrandTotal(){
	const grandTotalValue = printRows.grandTotal;
    const grandTotal = document.getElementById('grandTotal');
    const grandTotalFloating = document.getElementById('grandTotalFloating');
    highlightChangedElement(grandTotal);
	grandTotal.innerText = grandTotalValue;
	
	grandTotalFloating.innerText = grandTotalValue;
}

function highlightChangedElement(element, timeout = 300){
    const oldColor = element.parentElement.style.backgroundColor;
    element.style.backgroundColor = '#FF0'
    setTimeout(() => element.style.backgroundColor = oldColor, timeout);

}
