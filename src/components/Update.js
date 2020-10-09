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

    museumSelect = (e) => {
        if (!this.state.selectedMuseum) {
            this.setState({museumMissing: true})
        } else {
            this.setState({museumMissing: false});
            var uri = "http://localhost:3001/api/museums/name/?name=" + this.state.selectedMuseum.label;
            axios
                .get(uri)
                .then(res => {
                    this.setState({
                        isLoaded: true,
                        museum: res.data[0],

                        name: res.data[0].name,
                        link: res.data[0].link,
                        city: res.data[0].city,
                        address: res.data[0].address,

                        monday: res.data[0].hours.monday,
                        tuesday: res.data[0].hours.tuesday,
                        wednesday: res.data[0].hours.wednesday,
                        thursday: res.data[0].hours.thursday,
                        friday: res.data[0].hours.friday,
                        saturday: res.data[0].hours.saturday,
                        sunday: res.data[0].hours.sunday,

                        services: res.data[0].services,
                        themes: res.data[0].themes,

                        selectedMuseum: null,
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
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
            console.log(body);
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
            <div className="container">
                <h3>Choose a museum to update</h3>
                {this.state.museumMissing && <p className="error">Select a museum first</p>}
                <Select
                    value={selectedMuseum}
                    onChange={this.handleMuseumSelect}
                    options={this.state.museums.map(museum => ({value: museum.name, label: museum.name}))}
                />
                <button type="submit" onClick={this.museumSelect}>Search</button>
                {this.state.museum && <div>
                    <form>
                        <label className="row">{museum.name}
                        </label>
                        <label className="row">City
                            <input defaultValue={museum.city}
                                   onChange={(event) => {
                                       this.setState({city: event.target.value})
                                   }}
                            />
                        </label>
                        <label className="row">Address
                            <input defaultValue={museum.address}
                                   onChange={(event) => {
                                       this.setState({address: event.target.value})
                                   }}
                            />
                        </label>
                        <label className="row">URL
                            <input defaultValue={museum.link}
                                   onChange={(event) => {
                                       this.setState({link: event.target.value})
                                   }}
                            />
                        </label>
                        <br/>
                        <label className="row">Opening hours</label>
                        <label className="row">Monday
                            <input defaultValue={museum.hours.monday}
                                   onChange={(event) => {
                                       this.setState({monday: event.target.value})
                                   }}/>
                        </label>
                        <label className="row">Tuesday
                            <input defaultValue={museum.hours.tuesday}
                                   onChange={(event) => {
                                       this.setState({tuesday: event.target.value})
                                   }}/>
                        </label>
                        <label className="row">Wednesday
                            <input defaultValue={museum.hours.wednesday}
                                   onChange={(event) => {
                                       this.setState({wednesday: event.target.value})
                                   }}/>
                        </label>
                        <label className="row">Thursday
                            <input defaultValue={museum.hours.thursday}
                                   onChange={(event) => {
                                       this.setState({thursday: event.target.value})
                                   }}/>
                        </label>
                        <label className="row">Friday
                            <input defaultValue={museum.hours.friday}
                                   onChange={(event) => {
                                       this.setState({friday: event.target.value})
                                   }}/>
                        </label>
                        <label className="row">Saturday
                            <input defaultValue={museum.hours.saturday}
                                   onChange={(event) => {
                                       this.setState({saturday: event.target.value})
                                   }}/>
                        </label>
                        <label className="row">Sunday
                            <input defaultValue={museum.hours.sunday}
                                   onChange={(event) => {
                                       this.setState({sunday: event.target.value})
                                   }}/>
                        </label>
                        <br/>
                        <label className="row">Services</label>
                        <label className="row">service
                            <input defaultValue={museum.services}
                                   onChange={(event) => {
                                       this.setState({services: event.target.value})
                                   }}/>
                        </label>
                        <br/>
                        <label className="row">Themes</label>
                        <label className="row">theme
                            <input defaultValue={museum.themes}
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


