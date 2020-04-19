import React from 'react';
import Row, { DataRow } from './printableRow';
export default class RowSet {
    constructor() {
        this.rows = [new Row(0)];
        this.currentRow = 1;
        this.inputMap = {};
    }
    push(row) {
        return this.rows.push(row)
    }
    getCurrentRow() {
        return this.rows[this.currentRow - 1];
    }
    setCurrentRow(rowNo) {
        this.currentRow = rowNo;
    }
    getCurrentCellId(itemId) {
        return itemId + '_cell_' + this.currentRow;
    }

    size() {
        return this.rows.length;
    }
    deleteRow(rowIndex) {
       return this.rows.splice(rowIndex, 1);
    }
    deleteLastRow() {
        return this.rows.pop();
    }

    getInputMap() {
        return this.inputMap;
    }

    get grandTotal() {
        return this.rows.map(row => parseFloat(row.total)).reduce((x, y) => x + y).toFixed(2);
    }

    setFieldsWithSelectedRow(rowNo, callback) {
        this.currentRow = rowNo;
        callback()
    }
    
}

export const DataGroup = ({ id,rowSet, onClick }) => {
    const dataRows = rowSet.rows.map(row =>{
        return <DataRow key={row.sno} row={row}
        onClick={event => rowSet.setFieldsWithSelectedRow(row.sno, onClick)} />
    })
    return (
        <div id={id} className='table-row-group'>
            {dataRows}
        </div>
    );
}