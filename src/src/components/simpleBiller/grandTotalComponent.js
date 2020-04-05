import React, { Component } from 'react';

class GrandTotalComponent extends Component {
    constructor(props) {
        super(props);
        this.state.value = 0;
    }
    render() {
        return (<div className='table'>
            <div className='resp-table-row'>
                <div className='table-body-cell'>
                    Grand Total
				</div>
                <div id='grandTotal' className='table-body-cell'>
                    {this.state.value}
                </div>
            </div>
        </div>);
    }

}