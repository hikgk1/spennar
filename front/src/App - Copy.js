import React, { Component } from 'react';
import './App.css';
import { queryGet, querySearch, mutationCreate, mutationModify } from './gqlqueries.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchbar: "",
      spennir: {},
      spennar: [],
      form: {
        serialNumer: "",
        framleidandi: "",
        eigandi: "",
      },
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.velja = this.velja.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  
  componentDidMount() {
    this.searchSpennir();
  }
  
  getSpennir(id) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
      this.setState({
        spennir: xhr.response.data.getSpennir,
      });
    }.bind(this);
    xhr.send(JSON.stringify({
      query: queryGet,
      variables: { id: id },
    }));
  }
  
  newSpennir(spennir) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
      this.setState({
        spennir: xhr.response.data.createSpennir,
      });
    }.bind(this);
    xhr.send(JSON.stringify({
      query: mutationCreate,
      variables: { spennir: spennir },
    }));
  }
  
  searchSpennir(args) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
      this.setState({
        spennar: xhr.response.data.searchSpennir
      });
    }.bind(this);
    xhr.send(JSON.stringify({
      query: querySearch,
      variables: { search: args },
    }));
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      }
    });
  }

  handleSubmit(event) {
    this.newSpennir(this.state.form);
    this.searchSpennir();
    event.preventDefault();
  }

  velja(spennir) {
    this.setState({
      spennir: this.getSpennir(spennir._id),
    });
  }

  handleSearch(event) {
    event.preventDefault();
    this.searchSpennir(this.state.searchbar);
  }

  handleSearchChange(event) {
    this.setState({
      searchbar: event.target.value
    });
  }
  
  render() {
    let selected = null;
    if(this.state.spennir) {
      selected =
      <tr>
        <td>{this.state.spennir.serialNumer}</td>
        <td>{this.state.spennir.framleidandi}</td>
        <td>{this.state.spennir.eigandi}</td>
      </tr>;
    }
    
    let listi = [];
    if(this.state.spennar.length > 0) {
      this.state.spennar.forEach(spennir => {
        listi.push(
          <tr key={spennir._id} onClick={() => this.velja(spennir)}>
            <td>{spennir.serialNumer}</td>
            <td>{spennir.framleidandi}</td>
            <td>{spennir.eigandi}</td>
          </tr>
        );
      });
    }
    
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <input type="text" value={this.state.searchbar} onChange={this.handleSearchChange} />
          <input type="submit" value="Leita" />
        </form>
        <div>
          <h3>Niðurstaða úr leit</h3>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Serial Númer</th>
              <th>Framleiðandi</th>
              <th>Eigandi</th>
            </tr>
            {listi}
          </tbody>
        </table>
        <div>
          <h3>Valinn spennir</h3>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Serial Númer</th>
              <th>Framleiðandi</th>
              <th>Eigandi</th>
            </tr>
            {selected}
          </tbody>
        </table>
        <div>
          <h3>Nýr spennir</h3>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Serial Númer
            <input 
              name="serialNumer"
              type="text"
              value={this.state.form.serial}
              onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Framleiðandi
            <input 
              name="framleidandi"
              type="text"
              value={this.state.form.framl}
              onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Eigandi
            <input 
              name="eigandi"
              type="text"
              value={this.state.form.eigandi}
              onChange={this.handleChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
