import React, { Component } from 'react'
import PrintTable from '../../modules/table/printTable'
import BillContainer from './billContainer'
import PrintButton from './printButton'
import GrandTotalSticky from './grandTotalSticky'
import './index.css'
import './print.css'
import AddDeleteRowButton from './addDeleteRowButton'
import HeaderInputs from './headerInputs'
import DataInputs from './dataInputs'

export default class SimpleBiller extends Component {
    constructor(props){
        super(props)
        const table= new PrintTable()
        this.state = {
            table: table,
            billInfo: {},
            itemValues: table.getCurrentRow()
        }
    }
   
    handleTableModifyEvent() {
        this.setState({
            itemValues: this.state.table.getCurrentRow()
        })
    }
    handleRowChangeEvent(event){
        this.setState(this.state.table)
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
            itemValues: this.state.table.getCurrentRow()
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
                                <DataInputs printTable={this.state.table} itemValues={this.state.itemValues}
                                    onChange={this.handleRowChangeEvent.bind(this)}
                                />
                            </div>
                            <div className="col-sm-3">
                                <div className="sticky-top">
                                    <GrandTotalSticky grandTotal={this.state.table.getGrandTotalValue()} />
                                    <PrintButton />
                                    <AddDeleteRowButton printTable={this.state.table}
                                        modifyTableEventListener={this.handleTableModifyEvent.bind(this)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <BillContainer
                        billInfo={this.state.billInfo}
                        grandTotal={this.state.table.getGrandTotalValue()} >
                        {this.state.table.getTable('PrintTable_DataGroup', this.handleRowOnClickEvent.bind(this))}
                    </BillContainer>
                </div>
            </div>
        )
    };
}