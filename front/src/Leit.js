import React, { Component } from 'react';

import modeEnum from './modes';

class Leit extends Component {
    constructor(props) {
        super(props);

        this.search = this.search.bind(this);
        this.viewList = this.viewList.bind(this);
        this.onSearchInput = this.onSearchInput.bind(this);
        this.nyrSpennir = this.nyrSpennir.bind(this);
    }

    search(event) {
        event.preventDefault();
        this.props.searchSpennir(event.target.value);
    }

    viewList(event) {
        event.preventDefault();
        this.props.updateLeit("", this.props.searchSpennir);
        this.props.updateMode(modeEnum.listi);
    }

    onSearchInput(event) {
        event.preventDefault();
        this.props.updateLeit(event.target.value);
    }

    nyrSpennir(event) {
        event.preventDefault();
        this.props.updateValinn({});
        this.props.updateMode(modeEnum.breyta);
    }
    
    render() {
        return (
            <div className="w3-container w3-padding-16 w3-margin w3-large w3-row">
                <button className="w3-col m2 l2 w3-green w3-button w3-round w3-border" onClick={this.viewList}>
                    Listi
                </button>
                <form onSubmit={this.search}>
                    <input className="w3-input w3-border w3-col m8 l6" type="text" value={this.props.leitarOrd} onChange={this.onSearchInput} />
                    <input className="w3-button w3-blue w3-round w3-border w3-col m2 l2" type="submit" value="Leita" />
                </form>
                <button className="w3-col m2 l2 w3-orange w3-button w3-round w3-border" onClick={this.nyrSpennir}>
                    Nýr spennir
                </button>
            </div>
        );
    }
}

export default Leit;