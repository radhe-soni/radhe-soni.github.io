import React from 'react';

const BillInfo = ({ billInfo }) => {
    const infoStyles = {
        borderBottom: '1px dashed black'
    }
    const labels = {
        cName: "Customer /Shop Name:-",
        vNo: "Voucher No:-",
        cContact: "Customer /Shop Contact:-",
        bDate: "Date:-"
    }
    return (
        <div className="resp-table-row">
            <div className="table-body-cell pr-2 pl-5">
                <div className="row">
                    <div className='col-sm-3' >{labels.cName}
                                </div>
                    <div className='col-sm-3' style={infoStyles} id="customerNamePrint">{billInfo.customerName}</div>
                    <div className='offset-sm-1 col-sm-2'>{labels.vNo}</div>
                    <div className='col-sm-2' style={infoStyles} id="voucherNoPrint">{billInfo.voucherNo}</div>
                </div>
                <div className="row">
                    <div className='col-sm-3' >{labels.cContact}
                                </div>
                    <div className='col-sm-3' style={infoStyles} id="customerContactPrint">{billInfo.customerContact}</div>
                    <div className='offset-sm-1 col-sm-2'>{labels.bDate}</div>
                    <div className='col-sm-2' style={infoStyles} id="billDatePrint">{billInfo.billDate}</div>
                </div>
            </div>
        </div>
    )
}

export default BillInfo