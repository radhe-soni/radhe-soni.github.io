import React from 'react'
import ItemLabel from './itemLabel'
import InputField, { LookupInputField } from './itemField'
import Products from '../../resources/products.json'

const DataInputs = (props) => {
    const itemValues = props.itemValues
    return (
        <div>
            <div className="row">
                <div className="form-group col-sm-12">
                    <ItemLabel label='Item Name' />
                    <LookupInputField id="itemName" type="text" lookup={() => Products}
                        isItemVar="true" rowSet={props.rowSet} value={itemValues.itemName}
                        onChange={props.onChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-6">
                    <ItemLabel label='Rate' />
                    <InputField id="rate" type="text" inputmode="numeric"
                        pattern="^\d{0,5}(?:\.{0,1})(?:\d{1,2}){0,1}?$" isItemVar="true"
                        rowSet={props.rowSet}
                        value={itemValues.rate}
                        onChange={props.onChange}
                    />
                </div>
                <div className="form-group col-sm-6">
                    <ItemLabel label='Quantity' />
                    <InputField id="quantity" type="text" inputmode="numeric"
                        pattern="^\d{0,5}$" isItemVar="true" rowSet={props.rowSet}
                        value={itemValues.quantity}
                        onChange={props.onChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default DataInputs