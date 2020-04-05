import React, { Component } from 'react';
export default class GrandTotalSticky extends Component {

    render() {
        return (
            <div className="bg-success text-center">
                <div className='col-sm-12 h4'>GRAND TOTAL
                    <div className='col-sm-12'></div>
                    <span className='badge badge-dark'
                        id="grandTotalFloating">{this.props.grandTotal}
                    </span>
                </div>
            </div>
        )
    }
}