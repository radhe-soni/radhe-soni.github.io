import React from 'react';
import Proprieter from '../../resources/proprieter.json'

const BillFooter = () => {
    return (
        <div className="resp-table-footer">
            <div className="table-footer-cell">
                <div className="row">
                    <div className='col-sm-9'>
                        Proprieter:- {Proprieter.Name}
                    </div>
                    <div className='col-sm-9'>
                        Contact:- {Proprieter.Contact}
                    </div>
                    <div className='col-sm-9'>
                        <div>Address:- {Proprieter.AddressLine1}, {Proprieter.AddressLine2}
                        </div>
                        <div> {Proprieter.AddressLine3}</div>
                    </div>
                    <div className='col-sm-3' style={{ textAlign: "center" }}>
                        ------------------
                                </div>
                    <div className='col-sm-9'>
                        Pincode:- {Proprieter.Pincode}
                    </div>
                    <div className='col-sm-3' style={{ textAlign: "center" }}>
                        Signature
                                </div>
                </div>
            </div>
        </div>
    )
}

export default BillFooter