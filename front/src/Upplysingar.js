import React, { Component } from 'react';

import modeEnum from './modes';

class Upplysingar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spennir: null,
            mode: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.nyrThrepa = this.nyrThrepa.bind(this);
        this.nyttBushings = this.nyttBushings.bind(this);
    }

    componentDidMount() {
        this.setState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    handleChange(event) {
        if(this.state.mode === modeEnum.spennir) {
            return;
        }
        let undir = null;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if(target.attributes.undir) undir = target.attributes.undir.nodeValue;
    
        if(undir) {
            this.setState({
                spennir: {
                    ...this.state.spennir,
                    [undir]: {
                        ...this.state.spennir[undir],
                        [name]: value,
                    }
                }
            });
        } else {
            this.setState({
                spennir: {
                    ...this.state.spennir,
                    [name]: value,
                }
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.mode === modeEnum.breyta) {
            this.props.updateValinn(this.state.spennir, function() {
                if(this.state.spennir._id) {
                    this.props.modifySpennir();
                } else {
                    this.props.createSpennir();
                }
                this.props.updateMode(modeEnum.spennir);
            }.bind(this));
        } else {
            this.props.updateMode(modeEnum.breyta);
        }
    }

    nyrThrepa(event) {
        event.preventDefault();
        this.setState({
            spennir: {
                ...this.state.spennir,
                threpaskiptir: {},
            }
        });
    }

    nyttBushings(event) {
        event.preventDefault();
        this.setState({
            spennir: {
                ...this.state.spennir,
                bushings: {},
            }
        });
    }
    
    render() {
        if(this.state.spennir === null) {
            return null;
        }

        let threpaskiptir = null;
        let bushings = null;
        let takkar = null

        if(this.state.mode === modeEnum.spennir) {
            takkar = (
                <div>
                    <input className="w3-button w3-green w3-round w3-border w3-col s4 m4 l4 w3-margin" type="submit" value="Breyta" />
                </div>
            );
        } else {
            takkar = (
                <div>
                    <input className="w3-button w3-green w3-round w3-border w3-col s4 m4 l4 w3-margin" type="submit" value="Vista" />
                    <button className="w3-button w3-red w3-round w3-border w3-col s4 m4 l4 w3-margin" onClick={() => {this.props.updateMode(modeEnum.spennir)}}>
                        Hætta við
                    </button>
                </div>
            );
        }

        if(this.state.spennir.threpaskiptir) {
            threpaskiptir = (
            <div>
            <p>Þrepaskiptir:</p>
            <div className="w3-card w3-margin-left">
                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Serial Númer</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            undir="threpaskiptir"
                            name="serialNumer"
                            type="text"
                            value={this.state.spennir.threpaskiptir.serialNumer || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Framleiðandi</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            undir="threpaskiptir"
                            name="framleidandi"
                            type="text"
                            value={this.state.spennir.threpaskiptir.framleidandi || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Fjöldi Þrepa</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            undir="threpaskiptir"
                            name="fjoldiThrepa"
                            type="text"
                            value={this.state.spennir.threpaskiptir.fjoldiThrepa || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Grunnþrep</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            undir="threpaskiptir"
                            name="grunnThrep"
                            type="text"
                            value={this.state.spennir.threpaskiptir.grunnThrep || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>On/off Load</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            undir="threpaskiptir"
                            name="onOffLoad"
                            type="text"
                            value={this.state.spennir.threpaskiptir.onOffLoad || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>
            </div>
            </div>
            );
        } else if(this.state.mode === modeEnum.breyta) {
            threpaskiptir = (
                <button className="w3-col s4 m4 l4 w3-green w3-button w3-round w3-border w3-margin-left w3-margin-top" onClick={this.nyrThrepa}>
                    Bæta þrepaskipti
                </button>
            );
        }

        if(this.state.spennir.bushings) {
            bushings = (
            <div>
            <p>Bushings:</p>
            <div className="w3-card w3-margin-left">
                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Serial Númer</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            undir="bushings"
                            name="serialNumer"
                            type="text"
                            value={this.state.spennir.bushings.serialNumer || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Framleiðandi</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            undir="bushings"
                            name="framleidandi"
                            type="text"
                            value={this.state.spennir.bushings.framleidandi || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Framleiðsluár</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            undir="bushings"
                            name="framleidsluAr"
                            type="text"
                            value={this.state.spennir.bushings.framleidsluAr || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Týpa</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            undir="bushings"
                            name="typa"
                            type="text"
                            value={this.state.spennir.bushings.typa || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>U</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            undir="bushings"
                            name="uu"
                            type="text"
                            value={this.state.spennir.bushings.uu || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>V</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            undir="bushings"
                            name="vv"
                            type="text"
                            value={this.state.spennir.bushings.vv || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>W</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            undir="bushings"
                            name="ww"
                            type="text"
                            value={this.state.spennir.bushings.ww || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>N</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            undir="bushings"
                            name="nn"
                            type="text"
                            value={this.state.spennir.bushings.nn || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>u</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            undir="bushings"
                            name="u"
                            type="text"
                            value={this.state.spennir.bushings.u || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>v</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            undir="bushings"
                            name="v"
                            type="text"
                            value={this.state.spennir.bushings.v || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>w</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            undir="bushings"
                            name="w"
                            type="text"
                            value={this.state.spennir.bushings.w || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>n</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            undir="bushings"
                            name="n"
                            type="text"
                            value={this.state.spennir.bushings.n || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>
            </div>
            </div>
            );
        } else if(this.state.mode === modeEnum.breyta) {
            bushings = (
                <button className="w3-col s4 m4 l4 w3-green w3-button w3-round w3-border w3-margin-left w3-margin-top" onClick={this.nyttBushings}>
                    Bæta bushings
                </button>
            );
        }

        return (
            <div className="w3-half">
            <form className="w3-container" onSubmit={this.handleSubmit}>
                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Serial Númer</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            name="serialNumer"
                            type="text"
                            value={this.state.spennir.serialNumer || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Framleiðandi</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            name="framleidandi"
                            type="text"
                            value={this.state.spennir.framleidandi || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Framleiðsluár</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            name="framleidsluAr"
                            type="text"
                            value={this.state.spennir.framleidsluAr || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Eigandi</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            name="eigandi"
                            type="text"
                            value={this.state.spennir.eigandi || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>kVa</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            name="kVa"
                            type="text"
                            value={this.state.spennir.kVa || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Voltage HV</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            name="voltHV"
                            type="text"
                            value={this.state.spennir.voltHV || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Voltage LV</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            name="voltLV"
                            type="text"
                            value={this.state.spennir.voltLV || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Amperage HV</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            name="ampHV"
                            type="text"
                            value={this.state.spennir.ampHV || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Amperage LV</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            name="ampLV"
                            type="text"
                            value={this.state.spennir.ampLV || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Vector group</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            name="vectorGroup"
                            type="text"
                            value={this.state.spennir.vectorGroup || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Impedance</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            name="impedance"
                            type="text"
                            value={this.state.spennir.impedance || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Olíu þyngd</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            name="oliuThingd"
                            type="text"
                            value={this.state.spennir.oliuThingd || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    <div className="w3-col s3 m3 l3" style={{paddingTop: "8px"}}>Þyngd</div>
                    <div className="w3-col s9 m9 l9">
                        <input
                            className="w3-input"
                            name="thingd"
                            type="text"
                            value={this.state.spennir.thingd || ""}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="w3-row">
                    {threpaskiptir}
                </div>
                <div className="w3-row">
                    {bushings}
                </div>
                <div className="w3-row">
                    {takkar}
                </div>
            </form>
            </div>
        );
    }
}

export default Upplysingar;