import React, { Component } from 'react';
import PrintUtility from '../../modules/printUtility'

export default class PrintButton extends Component {

    printTheTable = () => {
        const printHeaderInputs = document.getElementsByClassName('print-header-input');
        for (var i = 0; i < printHeaderInputs.length; i++) {
            PrintUtility.populatePrintHeader(printHeaderInputs[i]);
        }
        const billInfo = document.getElementById('billInfo');
        const customerCopy = billInfo.cloneNode(true);
        const billInfoParent = billInfo.parentElement;
        const original = billInfoParent.innerHTML;

        const sellerDiv = document.createElement('div');
        sellerDiv.classList.add('row');
        sellerDiv.innerText = 'Seller Copy';
        billInfo.insertBefore(sellerDiv, billInfo.firstChild);

        const customerDiv = document.createElement('div');
        customerDiv.classList.add('row');
        customerDiv.innerText = 'Customer Copy';
        customerCopy.insertBefore(customerDiv, customerCopy.firstChild);
        billInfoParent.appendChild(customerCopy);
        window.print();
        window.onafterprint(() => {
            console.log("Printing completed...");
            billInfoParent.innerHTML = original;
        });
    };

    render() {
        return (
            <div>
                <div className="mt-1 text-center" >
                    <button className="btn btn-primary" onClick={this.printTheTable}>
                        <span className="display-4">Print</span>
                    </button>
                </div >
            </div>
        );
    }
}