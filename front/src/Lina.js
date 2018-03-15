import React, { Component } from 'react';
import modeEnum from './modes';

class Lina extends Component {
    onPick(event) {
        this.props.onSelect.updateValinn(event, this.props.onSelect.getSpennir);
        this.props.onSelect.updateMode(modeEnum.spennir);
    }

    render() {
        return (
            <tr onClick={() => this.onPick(this.props.spennir)}>
                <td>{this.props.spennir.serialNumer}</td>
                <td>{this.props.spennir.framleidandi}</td>
                <td>{this.props.spennir.eigandi}</td>
            </tr>
        );
    }
}

export default Lina;