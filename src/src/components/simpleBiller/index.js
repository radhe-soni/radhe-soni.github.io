import React, { Component } from 'react'
import PrintTable, { Table } from '../../modules/table/printTable'
import BillContainer from './billContainer'
import PrintButton from './printButton'
import GrandTotalSticky from './grandTotalSticky'
import './index.css'
import './print.css'
import AddDeleteRowButton from './addDeleteRowButton'
import HeaderInputs from './headerInputs'
import DataInputs from './dataInputs'

export default class SimpleBiller extends Component {
    state = {
        table: new PrintTable()
    }
    handleTableModifyEvent() {
        this.setState(this.state.table)
    }

    render() {
        let itemValues = this.state.table.getCurrentRow()
        return (
            <div>
                <div className="container  mt-2">
                    <div className="row card non-printable">
                        <div className="col-sm-12 row">
                            <div className="col-sm-9 card-body rounded">
                                <HeaderInputs />
                                <DataInputs printTable={this.state.table} itemValues={itemValues}
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
                    <BillContainer printTable={this.state.table}>
                        <Table key={'PrintTable_DataGroup'}
                            id={'PrintTable_DataGroup'}
                            printTable={this.state.table} />
                    </BillContainer>
                </div>
            </div>
        )
    };
}