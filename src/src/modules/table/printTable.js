import React from 'react';
import Row from './printableRow';
import RowSet, { DataGroup } from './printableRows';

export default class PrintTable {
    constructor() {
        this.rowSet = new RowSet();
        this.pushRow(new Row(0))
    }
    pushRow(row) {
        this.rowSet.rows.push(row);
    }
    setCurrentRow(rowNo) {
        this.rowSet.currentRow = rowNo;
    }
    getCurrentRow() {
        return this.rowSet.getCurrentRow();
    }
    size() {
        return this.rowSet.rows.length;
    }
    deleteRow(rowIndex) {
        this.rowSet.rows.splice(rowIndex, 1);
    }
    deleteLastRow() {
        this.rowSet.rows.pop();
    }
    getGrandTotalValue() {
        return this.rowSet.grandTotal;
    }
    static generateCellId(itemId, rowSeq = 0) {
        return itemId + '_cell_' + rowSeq;
    }
    getInputMap() {
        return this.rowSet.inputMap;
    }
    setFieldsWithSelectedRow(rowNo) {
        this.rowSet.setFieldsWithSelectedRow(rowNo)
    }
}

export const Table = ({ id, printTable }) => {
    return (
        <DataGroup id={id} rowSet={printTable.rowSet} />
    );
}



