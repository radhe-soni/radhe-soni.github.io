import React, { Component } from 'react';
import PrintUtility from '../../modules/printUtility'
class InputField extends Component {
    constructor(props) {
        super(props);
        this.isItemVar = this.props.isItemVar === "true" ? true : false;
        this.className = "form-control";
        if (!this.isItemVar) {
            this.className += " print-header-input";
        }
        this.handleOnInput = this.handleOnInput.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    handleOnInput(event) {
        if (this.isItemVar) {
            PrintUtility.updatePrintObj(event.target, this.props.rowSet);
        }
        else {
            PrintUtility.updatePrintHeader(event.target);
        }
    }
    handleOnChange(event) {
        this.props.onChange(event)
    }
    render() {
        const value = this.props.value
        return (
            <input className={this.className}
                id={this.props.id}
                type={this.props.type}
                onInput={this.handleOnInput}
                onChange={this.props.onChange}
                inputMode={this.props.inputmode}
                pattern={this.props.pattern}
                value={value} />
        )
    }
}

export class LookupInputField extends InputField {
   
    render() {
        let data = []
        if (typeof this.props.lookup == 'function') {
            data = this.props.lookup();
        }
        const value = this.props.value
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
                    value={value} />
                <datalist id="itemNames" defaultValue="">
                    <option value="">select</option>
                    {
                        data.map(
                            (itemValue) => <option key={itemValue} value={itemValue} />
                        )
                    }
                </datalist>
            </div>
        )
    }
}
export default InputField