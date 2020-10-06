import React, {Component} from "react";
import MuseumList from './MuseumsList'
import Select from 'react-select';
import themeOptions from '../data/themeOptions'
import serviceOptions from '../data/serviceOptions'
import weekdayOptions from '../data/weekdayOptions'

const axios = require('axios');

export default class Search  extends Component {

        state = {
            allMuseums: [],
            museums: [],
            isLoaded: false,
            searchWord: "",
            searchParameter: "City",
            selectedThemeOption: null,
            selectedServiceOption: null,
        }

    renderList =(event) => {
        var uri = "http://localhost:3001/api/museums/" + this.state.searchParameter.toLowerCase() + "/?" +
                    this.state.searchParameter.toLowerCase() + "="+this.state.searchWord;
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

    themeSelect =(e) =>{
            console.log(this.state.selectedThemeOption)
        var uri = "http://localhost:3001/api/museums/themes/?theme="+this.state.selectedThemeOption.value;
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
    };
    handleThemeSelect= selectedThemeOption => {
        this.setState({
            selectedThemeOption: selectedThemeOption ,
        });
    };

    handleServiceSelect= selectedServiceOption => {
        this.setState({
            selectedServiceOption: selectedServiceOption ,
        });
    };

    serviceSelect=(e) =>{
        var uri = "http://localhost:3001/api/museums/services/?service="+this.state.selectedServiceOption.value;
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
    };

    weekdaySelect=(e) =>{
        var uri = "http://localhost:3001/api/museums/hours/?weekday="+this.state.selectedWeekdayOption.value;
        axios
            .get(uri)
            .then(res => {
                console.log(res)
                this.setState({
                    isLoaded: true,
                    museums: res.data,
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    handleWeekdaySelect= selectedWeekdayOption => {
        this.setState({
            selectedWeekdayOption: selectedWeekdayOption ,
        });
    };



    componentDidMount(){
        var uri = "http://localhost:3001/api/museums";
        axios
            .get(uri)
            .then(res => {
                this.setState({
                    isLoaded: true,
                    allMuseums: res.data,
                    museums: res.data,
                });
            })
            .catch(err => {
                console.log(err);
            });

    }

    render() {
        const { selectedThemeOption } = this.state;
        const { selectedServiceOption } = this.state;
        const { selectedWeekdayOption } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <h3>Search by name or city</h3>
                            <form onSubmit={e => e.preventDefault()}>
                                <label>Name
                                    <input name="name" onChange={this.onNameChange}/>
                                </label>
                                <div onChange={this.onChangeValue}>
                                    <input type="radio" value="City" name="parameter" defaultChecked /> City
                                    <input type="radio" value="Name" name="parameter" /> Name
                                </div>
                                <button type="submit" onClick={this.renderList}>Search</button>
                            </form>
                        </div>
                        <div className="col-sm">
                            <h3>Search by theme</h3>
                            <Select
                                value={selectedThemeOption}
                                onChange={this.handleThemeSelect}
                                options={themeOptions}
                            />
                            <button type="submit" onClick={this.themeSelect}>Search</button>

                        </div>
                        <div className="col-sm">
                            <h3>Search by service</h3>
                            <Select
                                value={selectedServiceOption}
                                onChange={this.handleServiceSelect}
                                options={serviceOptions}
                            />
                            <button type="submit" onClick={this.serviceSelect}>Search</button>

                        </div>
                        <div className="col-sm">
                            <h3>Search by weekday</h3>
                            <Select
                                value={this.selectedWeekdayOption}
                                onChange={this.handleWeekdaySelect}
                                options={weekdayOptions}
                            />
                            <button type="submit" onClick={this.weekdaySelect}>Search</button>

                        </div>
                    </div>
                </div>

                <div>
                   {this.state.isLoaded && this.state.museums.length>0 && <MuseumList museums={this.state.museums}></MuseumList>}
                    {this.state.museums.length==0 && <p>Nothing to display</p>}
                </div>
            </div>
        )
    }

    onNameChange=(event)=>{
        this.setState({searchWord: event.target.value})
    };

    onChangeValue =(e)=>  {
        this.setState({searchParameter: e.target.value})
    }
}


