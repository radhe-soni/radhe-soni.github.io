"use strict";
const printRows = new PrintRows();
const printColumns = new PrintColumns();
const items = [
    "Samagra scholarship mapping",
    "Samagra scholarship profile updation and u dise profile updation",
    "Mapping list print out",
    "Feeding list print out",
    "Proposal print out",
    "M 1 click successful list print out",
    "M 1 click unsussessful list print out",
    "Inspire award registration",
    "Circular print out",
    "Typing works and print out",
    "Unmap student",
    "TC print out",
    "Account updation of students",
    "Class updation 1A of students",
    "Photocopy",
    "Other works and print out",
    "Salary Excelsheet print out",
    "MER updation and print out",
    "Uniform excel sheet and print out",
    "NMMS FORM ONLINE",
    "NMMS Admit card Print out",
    'Excel sheet/word sheet list', 'NSP PORTAL WORK', 'Email and print out', 'Online form', 'Scanning documents', 'Typing order/application/invitation card/other', 'Ramsa work/ramsa print out', 'RTE FORM', 'Exam paper print out', 'Model paper print out'
];


function loader() {
    intializeGAPIClient([createAppFolder, createMonthFolder]);
    initializeDateField();
    const itemNames = document.getElementById("itemNames");
    items.forEach(item => {
        const option = document.createElement("option");
        itemNames.appendChild(option);
        option.setAttribute("value", item);
        option.innerText = item;
    });

    const printable = document.getElementById('printable');
    printRows.rows.push(new PrintRow(printRows.rows.length));

    const headerRow = getHeaderRow();
    printable.appendChild(headerRow);
    printColumns.columns.map(columnInfo => getHeaderCell(columnInfo))
        .forEach(cell => headerRow.appendChild(cell));

    const firstRow = createTableRow(0);
    printColumns.columns.map(columnInfo => getNewCell(columnInfo))
        .forEach(cell => firstRow.appendChild(cell));

    const dataGroupRow = getDataGroup('printable');
    printable.appendChild(dataGroupRow);
    dataGroupRow.appendChild(firstRow);

    addListeners();
}
const initializeDateField = () => {
    const dateField = document.getElementById("billDate");
    dateField.value = getFormattedDate(new Date());
    populatePrintHeader(dateField);
}
function setFieldsWithSelectedRow(rowIndex) {
    const selectedRow = printRows.rows[rowIndex];
    selectedRow.resetFeilds(inputMap);
    printRows.currentRow = selectedRow.sno;
    console.log(JSON.stringify(printRows.getCurrentRow()));
    for (const itemId in selectedRow) {
        const item = document.getElementById(itemId);
        if (item) {
            item.value = selectedRow[itemId];
        }

    }
}
function addListeners() {
    var calculatables = document.getElementsByClassName('calculatable');
    for (var i = 0; i < calculatables.length; i++) {
        calculatables[i].addEventListener('input', updatePrintObj);
    }
}
const cells = {}

function updatePrintObj() {
    const calculatable = this;
    const itemId = calculatable.id;
    const itemValue = typeof calculatable.value === "string" ? calculatable.value : parseFloat(calculatable.value);
    const pattern = calculatable.pattern;
    let test = true;
    if(pattern){
        test = RegExp(pattern).test(itemValue);
    }
    if(test){
        printRows.getCurrentRow()[itemId] = itemValue;
        updatePrintItem(itemId);
    }
    else{
        calculatable.value = printRows.getCurrentRow()[itemId]
    }
    
}
function populatePrintHeader(element) {
    const printHeaderId = element.id + 'Print';
    if (element.type == 'date') {
        document.getElementById(printHeaderId).innerText = new Date(element.value).toLocaleDateString()
        return
    }
    document.getElementById(printHeaderId).innerText = element.value;

}
function printTheTable() {
    const printHeaderInputs = document.getElementsByClassName('print-header-input');
    for (var i = 0; i < printHeaderInputs.length; i++) {
        populatePrintHeader(printHeaderInputs[i]);
    }
    const billInfo = document.getElementById('billInfo');
    const customerCopy = billInfo.cloneNode(true);
    const billInfoParent = billInfo.parentElement;
    const original = billInfoParent.innerHTML;

    const sellerDiv = document.createElement('div');
    sellerDiv.classList.add('row');
    sellerDiv.innerText = 'Seller Copy';
    billInfo.insertBefore(sellerDiv, billInfo.firstChild);

    const customerDiv = document.createElement('div');
    customerDiv.classList.add('row');
    customerDiv.innerText = 'Customer Copy';
    customerCopy.insertBefore(customerDiv, customerCopy.firstChild);
    billInfoParent.appendChild(customerCopy);
    window.print();
    window.onafterprint(() => {
        console.log("Printing completed...");
        billInfoParent.innerHTML = original;
    });
}
function addNewItem() {
    const newPrintRow = new PrintRow(printRows.rows.length);
    printRows.rows.push(newPrintRow);
    printRows.currentRow = newPrintRow.sno;
    newPrintRow.resetFeilds(inputMap);
    const printable = document.getElementById('printableDataGroup');
    const newRow = createTableRow(newPrintRow.index);
    printColumns.columns.map(columnInfo => getNewCell(columnInfo))
        .forEach(cell => newRow.appendChild(cell));
    for (let i = 0; i < calculatables.length; i++) {
        let calculatable = calculatables[i];
        if (calculatable.className.includes('calculatable')) {
            calculatable.value = null;
        }
    }
    printable.appendChild(newRow);
    highlightChangedElement(newRow, 600);

}
function getFormattedDate(date) {
    return date.getFullYear()
        + "-"
        + ("0" + (date.getMonth() + 1)).slice(-2)
        + "-"
        + ("0" + date.getDate()).slice(-2);
}
var calculatables = document.getElementsByTagName('input');
var inputMap = getInputMap();
function getInputMap() {
    let inputMap = {};
    for (var i = 0; i < calculatables.length; i++) {
        inputMap[calculatables[i].id] = calculatables[i];
        inputMap[calculatables[i].id + '_next'] = calculatables[i + 1 < calculatables.length ? i + 1 : 0];
    }
    return inputMap;
}
[...document.getElementsByTagName('input')].forEach(e => e.addEventListener('keypress', gotoNextField));
function gotoNextField(e) {
    if (e.which == 13) {
        e.target.blur();
        let nextElement = inputMap[e.target.id + '_next'];
        if (nextElement) {
            nextElement.focus();
        }
    }
}
function deleteLastItem() {
    const rowIndex = printRows.rows.length - 1;
    if (rowIndex > 0) {
        const tableRow = document.getElementById('dataRow' + rowIndex);
        tableRow.parentNode.removeChild(tableRow);
        printRows.rows.splice(rowIndex, 1);
        setFieldsWithSelectedRow(rowIndex - 1);
        updateGrandTotal();
    }
    else{
        alert("At least one row is required.");
    }
}
function deleteCurrentItem() {
    const currentRowIndex = printRows.getCurrentRow().index;
    const currentRowElement = document.getElementById('dataRow' + currentRowIndex);
    currentRowElement.parentNode.removeChild(currentRowElement);
    console.log(printRows);
    printRows.rows.splice(currentRowIndex, 1);
    console.log(printRows);
    for (let i = 0; i < printRows.rows.length; i++) {
        let sno = printRows.rows[i].sno;
        const snoCell = document.getElementById('sno_cell_' + sno);
        sno = i + 1;
        snoCell.innerHTML = sno;
        snoCell.id = 'sno_cell_' + sno;
        printRows.rows[i].sno = sno;

    }
    if (currentRowIndex > 0) {
        setFieldsWithSelectedRow(currentRowIndex - 1);
    }

    console.log(printRows);
    updateGrandTotal();
}

(function () {

    var beforePrint = () => {
        // console.log('Functionality to run before printing.');
    };

    var afterPrint = fun => {
        if (typeof fun === "function") {
            fun();
        }
    }


    if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(mql => {
            if (mql.matches) {
                beforePrint();
            } else {
                fun => afterPrint(fun);
            }
        });
    }

    window.onbeforeprint = beforePrint;
    window.onafterprint = afterPrint;

}());

