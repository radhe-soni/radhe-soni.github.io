import React, { Component } from 'react'
import BillContainer from '../bill'
import PrintButton from './printButton'
import GrandTotalSticky from './grandTotalSticky'
import './index.css'
import './print.css'
import AddDeleteRowButton from './addDeleteRowButton'
import HeaderInputs from './headerInputs'
import DataInputs from './dataInputs'
import RowSet, { DataGroup } from '../../modules/table/printableRows'

export default class SimpleBiller extends Component {
    constructor(props) {
        super(props)
        const rowSet = new RowSet();
        this.state = {
            rowSet: rowSet,
            billInfo: {},
            itemValues: rowSet.getCurrentRow(),
            isPrinting: false
        }
        this.isPrinting = this.isPrinting.bind(this);
    }

    handleTableModifyEvent() {
        this.setState({
            itemValues: this.state.rowSet.getCurrentRow()
        })
    }
    handleRowChangeEvent(event) {
        this.setState(this.state.rowSet)
    }
    handleBillInfoChangedEvent(event) {
        const billInfo = {
            ...this.state.billInfo,
            [event.target.id]: `${event.target.value}`
        }
        this.setState({
            billInfo: billInfo
        })
    }
    handleRowOnClickEvent() {
        this.setState({
            itemValues: this.state.rowSet.getCurrentRow()
        })
    }
    isPrinting(isPrinting){
        this.setState({
            isPrinting: isPrinting
        })
    }
    render() {
        return (
            <div>
                <div className="container  mt-2">
                    <div className="row card non-printable">
                        <div className="col-sm-12 row">
                            <div className="col-sm-9 card-body rounded">
                                <HeaderInputs onChange={this.handleBillInfoChangedEvent.bind(this)} />
                                <DataInputs rowSet={this.state.rowSet} itemValues={this.state.itemValues}
                                    onChange={this.handleRowChangeEvent.bind(this)}
                                />
                            </div>
                            <div className="col-sm-3">
                                <div className="sticky-top">
                                    <GrandTotalSticky grandTotal={this.state.rowSet.grandTotal} />
                                    <PrintButton onClick={this.isPrinting} isPrinting={this.state.isPrinting}/>
                                    <AddDeleteRowButton rowSet={this.state.rowSet}
                                        modifyTableEventListener={this.handleTableModifyEvent.bind(this)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row bill-container">
                        <BillContainer
                            billInfo={this.state.billInfo}
                            grandTotal={this.state.rowSet.grandTotal}
                            isPrinting={this.state.isPrinting}>
                            <DataGroup id='PrintTable_DataGroup'
                                rowSet={this.state.rowSet}
                                onClick={this.handleRowOnClickEvent.bind(this)} />
                        </BillContainer>
                    </div>

                </div>
            </div>
        )
    };
}