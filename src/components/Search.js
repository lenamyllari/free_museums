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
            selectedWeekdayOption: null,
            error: "",
            serviceOptionMissing: false,
            themeOptionMissing: false,
            weekdayOptionMissing: false
        }



    renderList =(event) => {
        var uri = "http://localhost:3001/api/museums/" + this.state.searchParameter.toLowerCase() + "/?" +
                    this.state.searchParameter.toLowerCase() + "="+this.state.searchWord;
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
                this.setState({isLoaded: false})
                this.setState({error: err.message})
                console.log(err);
            });

    }

    themeSelect =(e) =>{
        if(!this.state.selectedThemeOption){
            this.setState({themeOptionMissing: true})
            this.setState({museums: []})
        }
        else {
            console.log(this.state.selectedThemeOption)
            this.setState({themeOptionMissing: false})
            var uri = "http://localhost:3001/api/museums/themes/?theme=" + this.state.selectedThemeOption.value;
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
        if(!this.state.selectedServiceOption){
            this.setState({serviceOptionMissing: true})
            this.setState({museums: []})
        }
        else {
            this.setState({serviceOptionMissing: false})
            var uri = "http://localhost:3001/api/museums/services/?service=" + this.state.selectedServiceOption.value;
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
    };

    weekdaySelect=(e) =>{
        if(!this.state.selectedWeekdayOption){
            this.setState({weekdayOptionMissing: true})
            this.setState({museums: []})
        }
        else {
            this.setState({weekdayOptionMissing: false})
            var uri = "http://localhost:3001/api/museums/hours/?weekday=" + this.state.selectedWeekdayOption.value;
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
        }
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
                            {this.state.themeOptionMissing && <p className="error">Select a theme first</p> }
                            <Select
                                value={selectedThemeOption}
                                onChange={this.handleThemeSelect}
                                options={themeOptions}
                            />
                            <button type="submit" onClick={this.themeSelect}>Search</button>

                        </div>
                        <div className="col-sm">
                            <h3>Search by service</h3>
                            {this.state.serviceOptionMissing && <p className="error">Select an option first</p> }
                            <Select
                                value={selectedServiceOption}
                                onChange={this.handleServiceSelect}
                                options={serviceOptions}
                            />
                            <button type="submit" onClick={this.serviceSelect}>Search</button>

                        </div>
                        <div className="col-sm">
                            <h3>Search by weekday</h3>
                            {this.state.weekdayOptionMissing && <p className="error">Select a weekday first</p> }
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
                    {!this.state.isLoaded && <p>{this.state.error}</p>}
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


