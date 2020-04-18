import React from 'react';
const GrandTotalSticky = ({ grandTotal }) => {
    return (
        <div className="bg-success text-center">
            <div className='col-sm-12 h4'>GRAND TOTAL
                    <div className='col-sm-12'></div>
                <span className='badge badge-dark'
                    id="grandTotalFloating">{grandTotal}
                </span>
            </div>
        </div>
    )
}

export default GrandTotalSticky