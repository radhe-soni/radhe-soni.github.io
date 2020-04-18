import React, { Component } from 'react';
import PrintUtility from '../../modules/printUtility'
class InputField extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.isItemVar = this.props.isItemVar === "true" ? true : false;
        this.className = "form-control";
        if (!this.isItemVar) {
            this.className += " print-header-input";
        }
        this.handleOnInput = this.handleOnInput.bind(this);
    }
    handleOnInput(event) {
        if (this.isItemVar) {
            PrintUtility.updatePrintObj(event.target, this.props.table);
        }
        else {
            PrintUtility.updatePrintHeader(event.target);
        }
    }
    render() {
        return (
            <input className={this.className}
                id={this.props.id}
                type={this.props.type}
                onInput={this.handleOnInput}
                onChange={this.props.onChange}
                inputMode={this.props.inputmode}
                pattern={this.props.pattern}
                defaultValue={this.props.defaultValue} />
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
                    onChange={this.props.onChange}
                    inputMode={this.props.inputmode}
                    pattern={this.props.pattern}
                    list="itemNames"
                    defaultValue={this.props.defaultValue} />
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