import React, { Component } from 'react'
import PrintTable, { PrintRow, DataGroup } from '../../modules/printTable'
import PrintUtility from '../../modules/printUtility'
import BillContainer from './billContainer'
import PrintButton from './printButton'
import GrandTotalSticky from './grandTotalSticky'
import './index.css'
import './print.css'
import AddDeleteRowButton from './addDeleteRowButton'
import HeaderInputs from './headerInputs'
import DataInputs from './dataInputs'

export default class SimpleBiller extends Component {
    constructor(props) {
        super(props)
        this.table = new PrintTable()
        this.table.pushRow(new PrintRow(this.table.size()))
        this.state = {
            dataGroup: this.getDataGroup(this.table)
        }
    }
    handleTableModifyEvent(getDataGroup) {
        this.setState({
            dataGroup: getDataGroup(this.table)
        });
    }

    render() {
        return (
            <div>
                <div className="container  mt-2">
                    <div className="row card non-printable">
                        <div className="col-sm-12 row">
                            <div className="col-sm-9 card-body rounded">
                                <HeaderInputs />
                                <DataInputs printTable={this.table}/>
                            </div>
                            <div className="col-sm-3">
                                <div className="sticky-top">
                                    <GrandTotalSticky grandTotal={this.table.getGrandTotalValue()} />
                                    <PrintButton />
                                    <AddDeleteRowButton printTable={this.table}
                                        modifyTableEventListener={() => this.handleTableModifyEvent(this.getDataGroup)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <BillContainer printTable={this.table} dataGroup={this.state.dataGroup} />
                </div>
            </div>
        )
    };
    getDataGroup(table) {
        return (
            <DataGroup key={'PrintTable_DataGroup'} id={'PrintTable_DataGroup'} printTable={table} />
        );
    }
}