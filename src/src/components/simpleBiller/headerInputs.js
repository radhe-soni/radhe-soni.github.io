import React, { Component } from 'react'
import ItemLabel from './itemLabel'
import InputField from './itemField'
export default class HeaderInputs extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="form-group col-sm-6">
                        <ItemLabel label='Customer /Shop Name' />
                        <InputField id="customerName" type="text" />
                    </div>
                    <div className="form-group col-sm-6">
                        <ItemLabel label='Cust /Shop Contact' />
                        <InputField id="customerContact" type="number" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-sm-6">
                        <ItemLabel label='Voucher No.' />
                        <InputField id="voucherNo" type="number" />
                    </div>
                    <div className="form-group col-sm-6">
                        <ItemLabel label='Date' />
                        <InputField id="billDate" type="date" />
                    </div>
                </div>
            </div>
        )
    }
}