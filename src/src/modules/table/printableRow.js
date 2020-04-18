import React from 'react';
import { DataCells } from './printableColumns';
export default class Row {
    constructor(index) {
        this.itemName = '';
        this.quantity = 0;
        this._rate = 0;
        this.sumTotal = 0;
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
        Object.entries(this).forEach((itemId, itemValue) => {
            const itemField = inputMap[itemId];
            console.log(itemField)
            if (itemField) {
                itemField.value = itemValue;
            }
        });

    }
    DataRow = ({ onClick }) => {
        return (
            <div
                id={'dataRow' + this.sno}
                className='resp-table-row data-table-row'
                title='Click on the row to edit !!!'
                onClick={() => onClick(this.sno)} >
                <DataCells row={this}/>
            </div>
        );
    }
}