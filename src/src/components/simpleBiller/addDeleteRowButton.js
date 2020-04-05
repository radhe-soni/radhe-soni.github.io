import React, { Component } from 'react';
import { PrintRow } from '../../modules/printTable';

export default class AddDeleteRowButton extends Component {
    constructor(props) {
        super(props);
        this.table = props.printTable;
    }
    pushRow = (row) => {
        this.table.pushRow(row);
    }
    setCurrentRow = (rowNo) => {
        this.table.setCurrentRow(rowNo);
    }
    addNewItem = () => {
        const newPrintRow = new PrintRow(this.table.size());
        this.pushRow(newPrintRow);
        this.setCurrentRow(newPrintRow.sno);
        newPrintRow.resetFeilds(this.table.inputMap);
        this.props.modifyTableEventListener();

    };
    deleteLastItem = () => {
        const rowIndex = this.table.size() - 1;
        if (rowIndex > 0) {
            this.table.printRows.rows.pop();
            this.props.modifyTableEventListener();
            this.table.setFieldsWithSelectedRow(rowIndex - 1);
        }
        else {
            alert("At least one row is required.");
        }
    };

    render() {
        return (
            <div>
                <div className="mt-1 text-center">
                    <button className="btn btn-primary" onClick={this.addNewItem}>
                        <span className="fa fa-plus"></span>
                        <span className="h5">Add New Item</span>
                    </button>
                </div>
                <div className="mt-1 text-center">
                    <button className="btn btn-primary" onClick={this.deleteLastItem}>
                        <span className="fa fa-remove"></span>
                        <span className="h5">Delete Last Item</span>
                    </button>
                </div>
            </div>
        );
    }
}