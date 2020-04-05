import React, { Component } from 'react'
import ItemLabel from './itemLabel'
import InputField, { LookupInputField } from './itemField'
export default class DataInputs extends Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="form-group col-sm-12">
                        <ItemLabel label='Item Name' />
                        <LookupInputField id="itemName" type="text" lookup={getListedItems} 
                        isItemVar="true" table={this.props.printTable} />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-sm-6">
                        <ItemLabel label='Rate' />
                        <InputField id="rate" type="text" inputmode="numeric"
                            pattern="^\d{0,5}(?:\.{0,1})(?:\d{1,2}){0,1}?$" isItemVar="true" 
                            table={this.props.printTable} />
                    </div>
                    <div className="form-group col-sm-6">
                        <ItemLabel label='Quantity' />
                        <InputField id="quantity" type="text" inputmode="numeric" 
                        pattern="^\d{0,5}$" isItemVar="true" table={this.props.printTable} />
                    </div>
                </div>
            </div>
        )
    }
}

const getListedItems = () => [
    "Samagra scholarship mapping",
    "Samagra scholarship profile updation and u dise profile updation",
    "Mapping list print out",
    "Feeding list print out",
    "Proposal print out",
    "M 1 click successful list print out",
    "M 1 click unsussessful list print out",
    "Inspire award registration",
    "Circular print out",
    "Typing works and print out",
    "Unmap student",
    "TC print out",
    "Account updation of students",
    "Class updation 1A of students",
    "Photocopy",
    "Other works and print out",
    "Salary Excelsheet print out",
    "MER updation and print out",
    "Uniform excel sheet and print out",
    "NMMS FORM ONLINE",
    "NMMS Admit card Print out",
    'Excel sheet/word sheet list', 'NSP PORTAL WORK', 'Email and print out', 'Online form', 'Scanning documents', 'Typing order/application/invitation card/other', 'Ramsa work/ramsa print out', 'RTE FORM', 'Exam paper print out', 'Model paper print out'
];
