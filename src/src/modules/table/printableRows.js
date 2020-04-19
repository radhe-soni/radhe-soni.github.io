import React from 'react';
export default class RowSet {
    constructor() {
        this.rows = [];
        this.currentRow = 1;
        this.inputMap = {};
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

    setFieldsWithSelectedRow(rowNo, callback) {
        this.currentRow = rowNo;
        callback()
    }
    
}

export const DataGroup = ({ id,rowSet, onClick }) => {
    const dataRows = rowSet.rows.map(row =>{
        const DataRow = row.DataRow;
        return <DataRow key={row.sno} 
        onClick={event => rowSet.setFieldsWithSelectedRow(row.sno, onClick)} />
    })
    return (
        <div id={id} className='table-row-group'>
            {dataRows}
        </div>
    );
}