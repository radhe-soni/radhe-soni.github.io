import React, { Component } from 'react';
import PrintUtility from '../../modules/printUtility'
class InputField extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.isItemVar = this.props.isItemVar === "true" ? true : false;
        this.className = "form-control";
        if (!this.state.isItemVar) {
            this.className += " print-header-input";
        }
        this.handleOnInput = this.handleOnInput.bind(this);
    }
    handleOnInput(event) {
        if (this.state.isItemVar) {
           this.updatePrintObj(event.target);
        }
        else {
            PrintUtility.populatePrintHeader(event.target);
        }
    }
    updatePrintObj(element) {
        const itemId = element.id;
        const itemValue = typeof element.value === "string" ? element.value : parseFloat(element.value);
        const pattern = element.pattern;
        let test = true;
        const table = this.props.table;
        const currentRow = table.getCurrentRow();
        if(pattern){
            test = RegExp(pattern).test(itemValue);
        }
        if(test){
            currentRow[itemId] = itemValue;
            
            PrintUtility.updatePrintItem(currentRow, itemId, table.getGrandTotalValue());
        }
        else{
            element.value = currentRow[itemId];
        }
        
    }
    render() {
        return (
            <input className={this.className}
                id={this.props.id}
                type={this.props.type}
                onInput={this.handleOnInput}
                inputMode={this.props.inputmode}
                pattern={this.props.pattern}
                value={this.state.value} />
        )
    }
}

export class LookupInputField extends InputField {

    render() {
        this.state.data = []
        if (typeof this.props.lookup == 'function') {
            this.state.data = this.props.lookup();
        }
        return (
            <div>
                <input className="form-control"
                    id={this.props.id}
                    type={this.props.type}
                    onInput={this.handleOnInput}
                    inputMode={this.props.inputmode}
                    pattern={this.props.pattern}
                    list="itemNames"
                    value={this.state.value} />
                <datalist id="itemNames" defaultValue="">
                    <option value="">select</option>
                    {
                        this.state.data.map(
                            (itemValue) => <option key={itemValue} value={itemValue} />
                        )}
                </datalist>
            </div>
        )
    }
}
export default InputField