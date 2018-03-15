import React, { Component } from 'react';

import Lina from './Lina';

class Listi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      functions: {
        updateValinn: this.props.updateValinn,
        updateMode: this.props.updateMode,
        getSpennir: this.props.getSpennir
      }
    }
  }

  render() {
    let listi = [];
    this.props.listi.forEach(spennir => {
      listi.push(
        <Lina key={spennir._id} spennir={spennir} onSelect={this.state.functions} />
      );
    });

    return (
      <div className="w3-container w3-margin">
        <table className="w3-table-all w3-hoverable">
          <tbody>
            <tr className="w3-grey">
              <th>Serial Númer</th>
              <th>Framleiðandi</th>
              <th>Eigandi</th>
            </tr>
            {listi}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Listi;