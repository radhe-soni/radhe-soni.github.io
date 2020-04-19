import React from 'react';
import './index.css';
import BillInfo from './billInfo';
import BillDetails from './billDetails';
import BillFooter from './billFooter';
import Proprieter from '../../resources/proprieter.json'

const BillContainer = ({ billInfo, children, grandTotal }) => {
    return (
        <div className="row bill-container">
            <div className="col-sm-12 printable bill-info" id="billInfo">
                <div className='table' id="billInfoTable">
                    <div className="resp-table-title">
                        <div className="table-header-cell">{Proprieter.Establishment}</div>
                    </div>
                    <BillInfo billInfo={billInfo} />
                    <BillDetails dataGroup={children} grandTotal={grandTotal} />
                    <BillFooter />
                </div>
            </div>
        </div>
    )
}

export default BillContainer