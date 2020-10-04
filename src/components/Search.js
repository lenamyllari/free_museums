import React, {Component} from "react";
import MuseumList from './MuseumsList'
import Select from 'react-select';
import themeOptions from '../data/themeOptions'
import serviceOptions from '../data/serviceOptions'

const axios = require('axios');


export default class Search  extends Component {

        state = {
            allMuseums: [],
            museums: [],
            isLoaded: false,
            searchWord: "",
            searchParameter: "",
            selectedThemeOption: null,
            selectedServiceOption: null,
        }


    renderList =(event) => {
        var chosenMuseums = []
        this.setState({isLoaded: false})
        this.setState({museums: []})
        if (this.state.searchParameter === "City") {
            for(var i=0; i<this.state.allMuseums.length; i++) {
                if(this.state.allMuseums[i].city == this.state.searchWord){
                    chosenMuseums.push(this.state.allMuseums[i])
                }
                this.setState({museums: chosenMuseums})
            }
        };
        this.setState({isLoaded: true})
    }

    themeSelect =(e) =>{
            console.log(e)
    };
    handleThemeSelect= selectedThemeOption => {
        this.setState({
            selectedThemeOption: selectedThemeOption ,
        });
        console.log(`Option selected:`, selectedThemeOption);
    };

    handleServiceSelect= selectedServiceOption => {
        this.setState({
            selectedServiceOption: selectedServiceOption ,
        });
        console.log(`Option selected:`, selectedServiceOption);
    };
    serviceSelect =(e) =>{
        console.log(e)
    };;


    componentDidMount(){
        console.log(this)
        var uri = "http://localhost:3001/api/museums";
        axios
            .get(uri)
            .then(res => {
                console.log(res)
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
                                    <input type="radio" value="City" name="parameter" /> City
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
                    </div>
                </div>

                <div>
                   {this.state.isLoaded && <MuseumList museums={this.state.museums}></MuseumList>}
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


