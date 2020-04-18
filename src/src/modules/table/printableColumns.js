import React from 'react';

class PrintColumn {
    constructor(name, className, itemId) {
        this.name = name;
        this.className = className;
        this.itemId = itemId;
    }
    DataCell = ({ row }) => {
        return (
            <div id={generateCellId(this.itemId, row.sno)} className='table-body-cell'>
                {row[this.itemId]}
            </div>
        )
    }
    HeaderCell = () => {
        return (
            <div id={generateCellId(this.itemId)} className='table-header-cell'>
                {this.name}
            </div>
        )
    }
}
const generateCellId = (itemId, rowSeq = 0) => {
    return itemId + '_cell_' + rowSeq;
}

const PrintColumns = {
    columns: [
        new PrintColumn('S. No.', 'col-1', 'sno'),
        new PrintColumn('Item Name', 'col-3', 'itemName'),
        new PrintColumn('Rate', 'col-2', 'rate'),
        new PrintColumn('Quantity', 'col-2', 'quantity'),
        new PrintColumn('Total', 'col-2', 'total')
    ]
}
export const HeaderCells = () => {
    return PrintColumns.columns.map(columnInfo => <columnInfo.HeaderCell
        key={columnInfo.itemId} />)
}
export const DataCells = ({ row }) => {
    return PrintColumns.columns.map(columnInfo => <columnInfo.DataCell
        key={columnInfo.itemId} row={row} />);
}
export default PrintColumns 
