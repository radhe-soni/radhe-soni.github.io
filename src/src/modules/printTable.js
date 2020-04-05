import React, { Component } from 'react';
const printColumnMap = {};
export default class PrintTable {
    constructor() {
        this.printRows = new PrintRows();
        this.printColumns = new PrintColumns();
        this.inputMap = {};
    }
    pushRow(row) {
        this.printRows.rows.push(row);
    }
    setCurrentRow(rowNo) {
        this.printRows.currentRow = rowNo;
    }
    getCurrentRow() {
        return this.printRows.getCurrentRow();
    }
    size() {
        return this.printRows.rows.length;
    }
    createHeaderCellFor() {
        return this.printColumns.columns.map(columnInfo => <HeaderCell
            itemId={columnInfo.itemId} header={columnInfo.name} key={columnInfo.itemId} />)
    }
    createCellsFor(row) {
        return this.printColumns.columns.map(columnInfo => <DataCell
            itemId={columnInfo.itemId}
            row={row} key={columnInfo.itemId}
        />);
    }
    deleteRow(rowIndex) {
        this.printRows.rows.splice(rowIndex, 1);
    }
    getGrandTotalValue() {
        return this.printRows.grandTotal;
    }
    static generateCellId(itemId, rowSeq = 0) {
        return itemId + '_cell_' + rowSeq;
    }

    setFieldsWithSelectedRow(rowIndex) {
        const selectedRow = this.printRows.rows[rowIndex];
        selectedRow.resetFeilds(this.inputMap);
        this.setCurrentRow(selectedRow.sno);
        for (const itemId in selectedRow) {
            const item = document.getElementById(itemId);
            if (item) {
                item.value = selectedRow[itemId];
            }

        }
    }
}
export class PrintColumn {
    constructor(name, className, itemId) {
        this.name = name;
        this.className = className;
        this.itemId = itemId;
        printColumnMap[itemId] = this;
    }
}
export class DataGroup extends Component {
    render() {
        this.rows = this.props.printTable.printRows.rows.map(row =>
            <DataRow key={'dataRow' + row.sno} id={'dataRow' + row.sno} printTable={this.props.printTable} row={row} ></DataRow>);
        return (
            <div
                id={this.props.id}
                className='table-row-group'>
                {this.rows}
            </div>
        );
    }
}
class DataRow extends Component {
    render() {
        const cells = this.props.printTable.createCellsFor(this.props.row);
        return (
            <div
                id={this.props.id}
                className='resp-table-row data-table-row'
                title='Click on the row to edit !!!'
                onClick={() => this.props.printTable.setFieldsWithSelectedRow(this.props.row.sno)} >
                {cells}
            </div>
        );
    }
}
class DataCell extends Component {
    render() {
        const id = PrintTable.generateCellId(this.props.itemId, this.props.row.sno);
        return (
            <div id={id} className='table-body-cell'>
                {this.props.row[this.props.itemId]}
            </div>
        )
    }
}
class HeaderCell extends Component {
    render() {
        const id = PrintTable.generateCellId(this.props.itemId);
        return (
            <div id={id} className='table-header-cell'>
                {this.props.header}
            </div>
        )
    }
}
export class PrintColumns {
    constructor() {
        this.columns = [
            new PrintColumn('S. No.', 'col-1', 'sno'),
            new PrintColumn('Item Name', 'col-3', 'itemName'),
            new PrintColumn('Rate', 'col-2', 'rate'),
            new PrintColumn('Quantity', 'col-2', 'quantity'),
            new PrintColumn('Total', 'col-2', 'total')
        ];
    }
}
export class PrintRows {
    constructor() {
        this.rows = [];
        this.currentRow = 1;
    }
    getCurrentRow() {
        return this.rows[this.currentRow - 1];
    }

    getCurrentCellId(itemId) {
        return itemId + '_cell_' + this.currentRow;
    }

    get grandTotal() {
        return this.rows.map(row => parseFloat(row.total)).reduce((x, y) => x + y).toFixed(2);
    }
}
export class PrintRow {
    constructor(index) {
        this.itemName = '';
        this.quantity = 0;
        this._rate = '';
        this.sumTotal = '';
        this.sno = index + 1;
    }
    get total() {
        this.sumTotal = this.rate * this.quantity;
        return this.sumTotal.toFixed(2);
    }
    get index() {
        return this.sno - 1;
    }
    get rate() {
        let value = parseFloat(this._rate);
        if (!value)
            value = 0;
        return value;
    }
    set rate(value) {
        this._rate = parseFloat(value);
    }
    generateCellId(itemId) {
        return itemId + '_cell_' + this.sno;
    }
    getCurrentCellId(itemId) {
        return itemId + '_cell_' + this.sno;
    }
    resetFeilds(inputMap) {
        Object.entries(this).forEach(entry => {
            const itemId = entry[0];
            const itemValue = entry[1];
            const itemField = inputMap[itemId];
            if (itemField) {
                itemField.value = itemValue;
            }
        });

    }
}