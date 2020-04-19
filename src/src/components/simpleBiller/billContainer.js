import React from 'react';
import './billContainer.css'
import { HeaderCells } from '../../modules/table/printableColumns';

const BillContainer = ({ billInfo, children, grandTotal }) => {
    return (
        <div className="row bill-container">
            <div className="col-sm-12 printable bill-info" id="billInfo">
                <div className='table' id="billInfoTable">
                    <div className="resp-table-header">
                        <div className="table-header-cell">ONLINE SUVIDHA KENDRA</div>
                    </div>
                    <BillInfo billInfo={billInfo}/>
                    <BillDetails dataGroup={children} grandTotal={grandTotal} />
                    <BillFooter />
                </div>
            </div>
        </div>
    )
}
const BillInfo = ({billInfo}) => {
    return (
        <div className="resp-table-row">
            <div className="table-body-cell">
                <div className="row">
                    <div className='col-sm-3' style={{ minWidth: "80px" }}>Customer /Shop Name:-
                                </div>
                    <div className='col-sm-3' id="customerNamePrint">{billInfo.customerName}</div>
                    <div className='offset-sm-2'>Voucher No:-</div>
                    <div className='col-sm-2' id="voucherNoPrint">{billInfo.voucherNo}</div>
                </div>
                <div className="row">
                    <div className='col-sm-3' style={{ minWidth: "80px" }}>Customer /Shop Contact:-
                                </div>
                    <div className='col-sm-3' id="customerContactPrint">{billInfo.customerContact}</div>
                    <div className='offset-sm-2'>Date:-</div>
                    <div className='col-sm-3' id="billDatePrint">{billInfo.billDate}</div>
                </div>
            </div>
        </div>
    )
}
const BillDetails = ({ dataGroup, grandTotal }) => {
    return (
        <div className="resp-table-row">
            <div className="table-body-cell">
                <div className="table" id="printable">
                    <HeaderCells />
                    {dataGroup}
                    <div className="resp-table-footer">
                        <div className="table-body-cell"></div>
                        <div className="table-body-cell">Grand Total</div>
                        <div className="table-body-cell"></div>
                        <div className="table-body-cell"></div>
                        <div className="table-body-cell" id="grandTotal">{grandTotal}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const BillFooter = () => {
    return (
        <div className="resp-table-footer">
            <div className="table-footer-cell">
                <div className="row">
                    <div className='col-sm-9'>
                        Proprieter:- Neeraj Soni
                                </div>
                    <div className='col-sm-9'>
                        Contact:- 9685168923, 9755665077
                                </div>
                    <div className='col-sm-9'>
                        <div>Address:- Online Suvidha Kendra, Taxi Stand Semariya
                                    </div>
                        <div> Jhagaraha Dist - Sidhi (M.P.)</div>
                    </div>
                    <div className='col-sm-3' style={{ textAlign: "center" }}>
                        ------------------
                                </div>
                    <div className='col-sm-9'>
                        Pincode:- 486661
                                </div>
                    <div className='col-sm-3' style={{ textAlign: "center" }}>
                        Signature
                                </div>
                </div>
            </div>
        </div>
    )
}
export default BillContainer