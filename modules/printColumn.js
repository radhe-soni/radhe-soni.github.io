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
            new PrintColumn('Pcs', 'col-2', 'pieces'),
            new PrintColumn('Rate', 'col-2', 'rate'),
            new PrintColumn('Weight', 'col-2', 'weight'),
            new PrintColumn('Purity', 'col-2', 'purity'),
            new PrintColumn('Wast-age', 'col-2', 'wastage'),
            new PrintColumn('Fine Weight', 'col-2', 'fineWeight'),
            new PrintColumn('Labour Rate', 'col-2', 'labourRate'),
            new PrintColumn('Labour', 'col-2', 'labourCharge'),
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
    get weightTotal() {
        return this.rows.map(row => row.getStandardWeight()).reduce((x, y) => x + y).toFixed(3);
    }
    get fineWeightTotal() {
        return this.rows.map(row => row.fineWeight).reduce((x, y) => x + y).toFixed(3);
    }
    get labourChargeTotal(){
        return this.rows.map(row => row.labourCharge).reduce((x, y) => x + y).toFixed(2);
    }
}
class PrintRow {
    constructor(index) {
        this.itemName = 'Gold Fine',
            this.rate = '',
            this.rateUnit = "tola",
            this.weight = '',
            this.weightUnit = "gram",
            this.purity = 100,
            this.pieces = 1,
            this.wastage = '',
            this.wastageUnit = "milligram",
            this.labourRate = '',
            this.sumTotal = '',
            this.labourRateUnit = "kilo",
            this.sno = index + 1
    }
    getStandardWeight() {
        return (unitMultiplier[this.weightUnit] * this.weight)
    }
    get fineWeight() {
        return ((this.getStandardWeight() * this.purity / 100)
            + (this.pieces * this.wastage * unitMultiplier[this.wastageUnit]));
    }
    get labourCharge() {
        if(this.labourRateUnit == 'pieces'){
            return (this.labourRate * this.pieces);
        }
        return (this.labourRate / unitMultiplier[this.labourRateUnit]) * this.getStandardWeight().toFixed(2);
    }
    get total() {
        this.sumTotal = (this.rate / unitMultiplier[this.rateUnit]) *
            this.fineWeight + this.labourCharge;
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
    getUnitSymbol(itemId) {
        return unitSymbol[this[itemId+'Unit']];
    }

}
const unitMultiplier = {
    gram: 0.001,
    tola: 0.01,
    milligram: 0.000001,
    kilo: 1,
    pieces: 1
}

const unitSymbol = {
    gram: 'g',
    tola: '10g',
    milligram: 'mg',
    kilo: 'kg',
    pieces: 'pc'
}

