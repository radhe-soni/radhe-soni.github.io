const printColumnMap = {};
class PrintColumn {
    constructor(name, className, itemId) {
        this.name = name,
            this.className = className,
            this.itemId = itemId,
        printColumnMap[itemId] = this;
    }
}

class PrintColumns {
    constructor() {
        this.columns = [
            new PrintColumn('S. No.', 'col-1', 'sno'),
            new PrintColumn('Item Name', 'col-3', 'itemName'),
            new PrintColumn('Quantity', 'col-2', 'quantity'),
            new PrintColumn('Rate', 'col-2', 'rate'),
            new PrintColumn('Total', 'col-2', 'total')
        ];
    }
}
class PrintRows {
    constructor() {
        this.rows = [];
        this.currentRow = 1;
    }
    generateCellId(itemId) {
        return itemId + '_cell_' + this.rows.length;
    }
    getCurrentRow() {
        return this.rows[this.currentRow - 1];
    }
    removeCurrentRow() {
        this.rows[this.currentRow - 1];
    }
    getCurrentCellId(itemId) {
        return itemId + '_cell_' + this.currentRow;
    }
    generateHeaderCellId(itemId) {
        return itemId + '_cell_' + 0;
    }
    get grandTotal() {
        return this.rows.map(row => parseFloat(row.total)).reduce((x, y) => x + y).toFixed(2);
    }
}
class PrintRow {
    constructor(index) {
        this.itemName = '',
        this.quantity = 0
        this.rate = '',
        this.sumTotal = '',
        this.sno = index + 1
    }
    get total() {
        this.sumTotal = this.rate * this.quantity;
        return this.sumTotal.toFixed(2);
    }
    get index() {
        return this.sno - 1;
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