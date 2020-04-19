import React from 'react'
import ItemLabel from './itemLabel'
import InputField from './itemField'
const HeaderInputs = ({ onChange }) => {
    return (
        <div>
            <div className="row">
                <div className="form-group col-sm-6">
                    <ItemLabel label='Customer /Shop Name' />
                    <InputField id="customerName" type="text"
                        onChange={onChange} />
                </div>
                <div className="form-group col-sm-6">
                    <ItemLabel label='Cust /Shop Contact' />
                    <InputField id="customerContact" type="number" 
                    onChange={onChange}/>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-6">
                    <ItemLabel label='Voucher No.' />
                    <InputField id="voucherNo" type="number" 
                    onChange={onChange}/>
                </div>
                <div className="form-group col-sm-6">
                    <ItemLabel label='Date' />
                    <InputField id="billDate" type="date" 
                    onChange={onChange}/>
                </div>
            </div>
        </div>
    )
}

export default HeaderInputs