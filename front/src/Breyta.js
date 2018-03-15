import React, { Component } from 'react';

class Breyta extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        console.log(`Breyta hlutur:`)
        console.log(this.props);
        return (<p>Þetta er Breyta hlutur</p>);
    }
}

export default Breyta;