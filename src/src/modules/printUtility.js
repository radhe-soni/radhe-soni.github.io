import React from 'react';

export default class PrintUtility {
	static cells = {}
	static getDataGroup(parentId, row) {
		return (
			<div
				id={parentId + 'DataGroup'}
				className='table-row-group'>
				{row}
			</div>
		);
	}
	static createHeaderRow() {
		return (
			<div className='resp-table-header'>
			</div>
		);
	}
	static getFooterRow() {
		return (
			<div className='resp-table-footer'>
			</div>
		);
	}
	static getGrandTotalRow() {
		return (<div className='table'>
			<div className='resp-table-row'>
				<div className='table-body-cell'>
					Grand Total
				</div>
				<div id='grandTotal' className='table-body-cell'>
					0
				</div>
			</div>
		</div>);
	}
	static createTableRow(index, listener, cells) {
		return (
				<div
					id={'dataRow' + index}
					className='resp-table-row data-table-row'
					title='Click on the row to edit !!!'
					onClick={listener}>
					{cells}
				</div>
		)
	}
	static getColumnName(itemId, name) {
		return `${name}`;
	}

	static updatePrintItem(row, itemId, grandTotalValue) {
		const cellId = row.getCurrentCellId(itemId);
		let cell = document.getElementById(cellId);
		this.highlightChangedElement(cell);
		cell.innerHTML = row[itemId];
		this.updateSubTotal(row);
		this.updateGrandTotal(grandTotalValue);
	}

	static updateSubTotal(row) {
		let cellId = row.getCurrentCellId('total');
		let cell = document.getElementById(cellId);
		this.highlightChangedElement(cell);
		cell.innerHTML = row.total;
	}
	static updateGrandTotal(grandTotalValue) {
		const grandTotal = document.getElementById('grandTotal');
		const grandTotalFloating = document.getElementById('grandTotalFloating');
		this.highlightChangedElement(grandTotal);
		grandTotal.innerText = grandTotalValue;
		grandTotalFloating.innerText = grandTotalValue;
	}

	static highlightChangedElement(element, timeout = 300) {
		const oldColor = element.parentElement.style.backgroundColor;
		element.style.backgroundColor = '#FF0'
		setTimeout(() => element.style.backgroundColor = oldColor, timeout);

	}

	static populatePrintHeader(element) {
		const printHeaderId = element.id + 'Print';
		if (element.type === 'date') {
			document.getElementById(printHeaderId).innerText = new Date(element.value).toLocaleDateString()
		}
		else{
			document.getElementById(printHeaderId).innerText = element.value;
		}

	}

}
