

const getprintItemColumnSequence = () => {
    let i = 0;
    return {
        pieces: i++,
        rate: i++,
        weight: i++,
        purity: i++,
        wastage: i++,
        labour: i++,
        sumTotal: i++
    }
}
const printItemColumnSequence = getprintItemColumnSequence();
class PrintColumn {
    constructor(name, className, itemId) {
        this.name = name,
            this.className = className,
            this.itemId = itemId,
            this.sequence = printItemColumnSequence[itemId]
    }
}

class PrintColumns {
    constructor() {
        this.columns = [
            new PrintColumn('S.No.', 'col-1', 'sno'),
            new PrintColumn('Item Name', 'col-3', 'itemName'),
            new PrintColumn('Pieces', 'col-2', 'pieces'),
            new PrintColumn('Rate', 'col-2', 'rate'),
            new PrintColumn('Weight', 'col-2', 'weight'),
            new PrintColumn('Purity', 'col-2', 'purity'),
            new PrintColumn('Wastage', 'col-2', 'wastage'),
            new PrintColumn('Labour', 'col-2', 'labour'),
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
        return itemId + 'cell' + this.rows.length;
    }
    getCurrentRow() {
        return this.rows[this.currentRow - 1];
    }
    getCurrentCellId(itemId) {
        return itemId + 'cell' + this.currentRow;
    }
}
class PrintRow {
    constructor(index) {
        this.itemName = 'Gold Fine',
        this.rate = 0,
        this.rateUnit = "tola",
        this.weight = 0,
        this.weightUnit = "gram",
        this.purity = 100,
        this.pieces = 0,
        this.wastage = 0,
        this.wastageUnit = "milligram",
        this.labour = 0,
        this.sumTotal = 0,
        this.labourUnit = "kilo",
        this.sno = index
    }
    get total() {
        this.sumTotal = (this.rate / unitMultiplier[this.rateUnit]) *
            ((unitMultiplier[this.weightUnit] * this.weight * this.purity / 100)
                + (this.pieces * this.wastage * unitMultiplier[this.wastageUnit]))
            + (this.labour / unitMultiplier[this.labourUnit]);
        return this.sumTotal;
    }
    get index() {
        return this.sno - 1;
    }
}
const unitMultiplier = {
    gram: 0.001,
    tola: 0.01,
    milligram: 0.000001,
    kilo: 1
}

