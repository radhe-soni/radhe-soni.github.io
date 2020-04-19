import React, { Component } from 'react';
import './index.css';
import BillInfo from './billInfo';
import BillDetails from './billDetails';
import BillFooter from './billFooter';
import Proprieter from '../../resources/proprieter.json'

class BillContainer extends Component {
    render() {
        const { billInfo, grandTotal, children } = this.props;
        const copy = this.props.isPrinting ? this.getPrintVersion(billInfo, grandTotal, children)
            : this.getSingle(billInfo, grandTotal, children);
        return  copy
    }
    getSingle = (billInfo, grandTotal, children) => {
        return (
            <div className='col-sm-12'>
            <Printable billInfo={billInfo} grandTotal={grandTotal}>
                {children}
            </Printable>
            </div>
        )
    }

    getPrintVersion = (billInfo, grandTotal, children) => {
        return <div>
            <div className='col-sm-6'>
                <div className='row'>Seller Copy</div>
                <Printable billInfo={billInfo} grandTotal={grandTotal}>
                    {children}
                </Printable>
            </div>
            <div className='col-sm-6'>
                <div className='row'>Customer Copy</div>
                <Printable billInfo={billInfo} grandTotal={grandTotal}>
                    {children}
                </Printable>
            </div>
        </div>
    }
}

const Printable = React.forwardRef(
    function printable({ billInfo, children, grandTotal }, ref) {
        return (
            <div className="row printable bill-info pl-1 pr-1" id="billInfo" ref={ref}>
                <div className='table' id="billInfoTable">
                    <div className="resp-table-title">
                        <div className="table-header-cell">{Proprieter.Establishment}</div>
                    </div>
                    <BillInfo billInfo={billInfo} />
                    <BillDetails dataGroup={children} grandTotal={grandTotal} />
                    <BillFooter />
                </div>
            </div>
        )
    });
export default BillContainer