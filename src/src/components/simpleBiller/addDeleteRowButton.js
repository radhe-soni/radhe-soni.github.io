import React from 'react';
import Row from '../../modules/table/printableRow';

const AddDeleteRowButton = ({ printTable, modifyTableEventListener }) => {
    const addNewItem = (callBack) => {
        const newPrintRow = new Row(printTable.size());
        printTable.pushRow(newPrintRow);
        printTable.setCurrentRow(newPrintRow.sno);
        newPrintRow.resetFeilds(printTable.getInputMap());
        callBack();
    };
    const deleteLastItem = (callBack) => {
        const rowIndex = printTable.size() - 1;
        if (rowIndex > 0) {
            printTable.deleteLastRow();
            callBack();
            printTable.setFieldsWithSelectedRow(rowIndex);
        }
        else {
            alert("At least one row is required.");
        }
    };

    return (
        <div>
            <Button iconClass="fa fa-plus"
                actionListner={() => addNewItem(modifyTableEventListener)}>
                Add New Item
            </Button>
            <Button iconClass="fa fa-minus"
                actionListner={() => deleteLastItem(modifyTableEventListener)}>
                Delete Last Item
            </Button>
        </div>
    );
}

const Button = (props) => {
    return (
        <div className="mt-1 text-center">
            <button className="btn btn-primary" onClick={props.actionListner}>
                <span className={props.iconClass}></span>
                <span className="h5">{props.children}</span>
            </button>
        </div>
    )
}
export default AddDeleteRowButton