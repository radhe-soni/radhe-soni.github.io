import React from 'react';
import { HeaderCells } from '../../modules/table/printableColumns';

const BillDetails = ({ dataGroup, grandTotal }) => {
    return (
        <div className="resp-table-row">
            <div className="table-body-cell">
                <div className="table" id="printable">
                    <div className="resp-table-header">
                        <HeaderCells />
                    </div>
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
export default BillDetails

