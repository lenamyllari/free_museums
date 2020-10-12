import React, {Component} from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Select from "react-select";

const axios = require('axios');

export default class Update extends Component {

    state = {
        museums: [],
        isLoaded: false,
        museumMissing: false,
        selectedMuseum: null,
        museum: null,

        name: "",
        link: "",
        city: "",
        address: "",

        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",

        services: [],
        themes: [],

        error: "",
    };

    handleMuseumSelect = selectedMuseum => {
        this.setState({
            selectedMuseum: selectedMuseum,
        });
    };

    //when a museums is selected => get museum's details from the database
    museumSelect = (e) => {
        this.setState({museum: null})
        if (!this.state.selectedMuseum) {
            this.setState({museumMissing: true})
        } else {
            this.setState({museumMissing: false});
            var uri = "http://localhost:3001/api/museums/name/?name=" + this.state.selectedMuseum.label;
            axios
                .get(uri)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        isLoaded: true,
                        museum: res.data,

                        name: res.data.name,
                        link: res.data.link,
                        city: res.data.city,
                        address: res.data.address,

                        selectedMuseum: null,
                    });
                    if(res.data.hours){
                        this.setState({
                            monday: res.data.hours.monday,
                            tuesday: res.data.hours.tuesday,
                            wednesday: res.data.hours.wednesday,
                            thursday: res.data.hours.thursday,
                            friday: res.data.hours.friday,
                            saturday: res.data.hours.saturday,
                            sunday: res.data.hours.sunday,
                        });
                    }
                    if(res.data.services){
                        this.setState({
                            services: res.data.services,
                        });
                    }
                    if(res.data.themes){
                        this.setState({
                            themes: res.data.themes,
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    //saving the changes after submitting
    saveChanges = async (e) => {
        e.preventDefault();
        const museum = await this.getMuseum();
        var request = require('request');
        var data = {
            url: "http://localhost:3001/api/museums/update",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: museum
        };
        request.put(data, function (error, httpResponse, body) {
            console.log(body)

        });
        this.setState({museum: null})
    };

    getMuseum = () => {
        return {
            name: this.state.name,
            link: this.state.link,
            city: this.state.city,
            address: this.state.address,
            hours: {
                monday: this.state.monday,
                tuesday: this.state.tuesday,
                wednesday: this.state.wednesday,
                thursday: this.state.thursday,
                friday: this.state.friday,
                saturday: this.state.saturday,
                sunday: this.state.sunday
            },
            services: this.state.services,
            themes: this.state.themes
        };
    };

    //getting info about all the museums for the database => data needed for Select options
    componentDidMount() {
        var uri = "http://localhost:3001/api/museums/all";
        axios
            .get(uri)
            .then(res => {
                this.setState({
                    isLoaded: true,
                    museums: res.data,
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const {selectedMuseum} = this.state;
        const {museum} = this.state;
        return (
            <div className="mystyle">
                <div>
                <h3>Choose a museum to update</h3>
                {this.state.museumMissing && <p className="error">Select a museum first</p>}
                <Select
                    value={selectedMuseum}
                    onChange={this.handleMuseumSelect}
                    options={this.state.museums.map(museum => ({value: museum.name, label: museum.name}))}
                />
                <button style={{margin: "10px"}} type="submit" onClick={this.museumSelect}>Search</button>
                </div>
                {this.state.museum && <div>
                    <form className="myform">
                        <label className="row">{museum.name}
                        </label>
                        <label className="row">City
                            <input
                                style={{marginLeft: "10px"}}
                                defaultValue={museum.city}
                                   onChange={(event) => {
                                       this.setState({city: event.target.value})
                                   }}
                            />
                        </label>
                        <label className="row">Address
                            <input
                                style={{marginLeft: "10px"}}
                                defaultValue={museum.address}
                                   onChange={(event) => {
                                       this.setState({address: event.target.value})
                                   }}
                            />
                        </label>
                        <label className="row">URL
                            <input
                                style={{marginLeft: "10px"}}
                                defaultValue={museum.link}
                                   onChange={(event) => {
                                       this.setState({link: event.target.value})
                                   }}
                            />
                        </label>
                        <br/>
                        <label className="row">Opening hours</label>
                        <label className="row">Monday
                            <input
                                style={{marginLeft: "10px"}}
                                defaultValue={this.state.monday}
                                   onChange={(event) => {
                                       this.setState({monday: event.target.value})
                                   }}/>
                        </label>
                        <label className="row">Tuesday
                            <input
                                style={{marginLeft: "10px"}}
                                defaultValue={this.state.tuesday}
                                   onChange={(event) => {
                                       this.setState({tuesday: event.target.value})
                                   }}/>
                        </label>
                        <label className="row">Wednesday
                            <input
                                style={{marginLeft: "10px"}}
                                defaultValue={this.state.wednesday}
                                   onChange={(event) => {
                                       this.setState({wednesday: event.target.value})
                                   }}/>
                        </label>
                        <label className="row">Thursday
                            <input
                                style={{marginLeft: "10px"}}
                                defaultValue={this.state.thursday}
                                   onChange={(event) => {
                                       this.setState({thursday: event.target.value})
                                   }}/>
                        </label>
                        <label className="row">Friday
                            <input
                                style={{marginLeft: "10px"}}
                                defaultValue={this.state.friday}
                                   onChange={(event) => {
                                       this.setState({friday: event.target.value})
                                   }}/>
                        </label>
                        <label className="row">Saturday
                            <input
                                style={{marginLeft: "10px"}}
                                defaultValue={this.state.saturday}
                                   onChange={(event) => {
                                       this.setState({saturday: event.target.value})
                                   }}/>
                        </label>
                        <label className="row">Sunday
                            <input
                                style={{marginLeft: "10px"}}
                                defaultValue={this.state.sunday}
                                   onChange={(event) => {
                                       this.setState({sunday: event.target.value})
                                   }}/>
                        </label>
                        <br/>
                        <label className="row">Services</label>
                        <label className="row">service
                            <input
                                style={{marginLeft: "10px"}}
                                defaultValue={this.state.services}
                                   onChange={(event) => {
                                       this.setState({services: event.target.value})
                                   }}/>
                        </label>
                        <br/>
                        <label className="row">Themes</label>
                        <label className="row">theme
                            <input
                                style={{marginLeft: "10px"}}
                                defaultValue={this.state.themes}
                                   onChange={(event) => {
                                       this.setState({themes: event.target.value})
                                   }}/>
                        </label>
                        <button onClick={this.saveChanges}>Save</button>
                    </form>
                </div>
                }
            </div>
        )
    }
}


