import React, { Component } from 'react';
import './App.css';
import { queryGet, querySearch, mutationCreate, mutationModify } from './gqlqueries.js'

import Leit from './Leit';
import Listi from './Listi';
import Spennir from './Spennir';

import modeEnum from './modes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listi: [],
      valinn: {},
      mode: modeEnum.listi,
      leitarOrd: ""
    };

    this.getSpennir = this.getSpennir.bind(this);
    this.searchSpennir = this.searchSpennir.bind(this);
    this.createSpennir = this.createSpennir.bind(this);
    this.modifySpennir = this.modifySpennir.bind(this);
    this.updateListi = this.updateListi.bind(this);
    this.updateValinn = this.updateValinn.bind(this);
    this.updateMode = this.updateMode.bind(this);
    this.updateLeit = this.updateLeit.bind(this);
  }
  
  componentDidMount() {
    this.searchSpennir();
  }

  getSpennir() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
      this.setState({
        valinn: xhr.response.data.getSpennir
      });
    }.bind(this);
    xhr.send(JSON.stringify({
      query: queryGet,
      variables: { id: this.state.valinn._id },
    }));
  }

  searchSpennir() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
      this.setState({
        listi: xhr.response.data.searchSpennir
      });
    }.bind(this);
    xhr.send(JSON.stringify({
      query: querySearch,
      variables: { search: this.state.leitarOrd },
    }));
  }

  createSpennir() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
      this.setState({
        valinn: xhr.response.data.createSpennir
      });
    }.bind(this);
    xhr.send(JSON.stringify({
      query: mutationCreate,
      variables: { spennir: this.state.valinn },
    }));
  }

  modifySpennir() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
      this.setState({
        valinn: xhr.response.data.modifySpennir
      });
    }.bind(this);
    xhr.send(JSON.stringify({
      query: mutationModify,
      variables: { spennir: this.state.valinn },
    }));
  }

  updateListi(newListi, cb) {
    if(cb) {
      this.setState({
        listi: newListi
      }, () => cb());
    } else {
      this.setState({
        listi: newListi
      });
    }
  }

  updateValinn(newValinn, cb) {
    if(cb) {
      this.setState({
        valinn: newValinn
      }, () => cb());
    } else {
      this.setState({
        valinn: newValinn
      });
    }
    console.log("Nýr valinn: ");
    console.log(this.state.valinn);
  }

  updateMode(newMode, cb) {
    if(cb) {
      this.setState({
        mode: newMode
      }, () => cb());
    } else {
      this.setState({
        mode: newMode
      });
    }
  }

  updateLeit(newLeit, cb) {
    if(cb) {
      this.setState({
        leitarOrd: newLeit
      }, () => cb());
    } else {
      this.setState({
        leitarOrd: newLeit
      });
    }
  }
  
  render() {
    console.log("========== Render kall ==========");
    let rest = null;
    if (this.state.mode === modeEnum.listi) {
      rest = <Listi listi={this.state.listi} 
                    updateValinn={this.updateValinn}
                    updateMode={this.updateMode}
                    getSpennir={this.getSpennir} />
    } else if (this.state.mode === modeEnum.spennir || modeEnum.breyta) {
      rest = <Spennir valinn={this.state.valinn}
                      mode={this.state.mode}
                      updateValinn={this.updateValinn}
                      updateMode={this.updateMode}
                      createSpennir={this.createSpennir}
                      modifySpennir={this.modifySpennir} />
    }
    return (
      <div className="w3-content">
        <Leit leitarOrd={this.state.leitarOrd}
              updateLeit={this.updateLeit}
              searchSpennir={this.searchSpennir}
              updateMode={this.updateMode}
              updateValinn={this.updateValinn} />
        {rest}
      </div>
    );
  }
}

export default App;
