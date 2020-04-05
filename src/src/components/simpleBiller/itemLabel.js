import React,{ Component } from 'react';

class ItemLabel extends Component {
    render(){
        return (
        <span className="badge badge-dark"><label>{this.props.label}</label></span>
        )
    }
}

export default ItemLabel