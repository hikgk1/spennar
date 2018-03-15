import React, { Component } from 'react';

import Upplysingar from './Upplysingar';
import Skrar from './Skrar';

class Spennir extends Component {
    render() {
        return (
            <div className="w3-container w3-margin w3-card w3-row">
                <Upplysingar
                    spennir={this.props.valinn}
                    mode={this.props.mode}
                    updateValinn={this.props.updateValinn}
                    updateMode={this.props.updateMode}
                    createSpennir={this.props.createSpennir}
                    modifySpennir={this.props.modifySpennir} />
                <Skrar spennir={this.props.valinn} />
            </div>
        );
    }
}

export default Spennir;