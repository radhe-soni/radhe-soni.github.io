import React from 'react'
import ItemLabel from './itemLabel'
import InputField, { LookupInputField } from './itemField'
import Products from '../../resources/products.json'

const DataInputs = ({ printTable, itemValues, onChange }) => {
    return (
        <div>
            <div className="row">
                <div className="form-group col-sm-12">
                    <ItemLabel label='Item Name' />
                    <LookupInputField id="itemName" type="text" lookup={() => Products}
                        isItemVar="true" table={printTable} defaultValue={itemValues.itemName}
                    />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-6">
                    <ItemLabel label='Rate' />
                    <InputField id="rate" type="text" inputmode="numeric"
                        pattern="^\d{0,5}(?:\.{0,1})(?:\d{1,2}){0,1}?$" isItemVar="true"
                        table={printTable}
                        defaultValue={itemValues.rate}
                    />
                </div>
                <div className="form-group col-sm-6">
                    <ItemLabel label='Quantity' />
                    <InputField id="quantity" type="text" inputmode="numeric"
                        pattern="^\d{0,5}$" isItemVar="true" table={printTable}
                        defaultValue={itemValues.quantity}
                    />
                </div>
            </div>
        </div>
    )
}

export default DataInputs