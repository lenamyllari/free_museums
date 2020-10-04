import React, {Component} from "react";
import MuseumList from './MuseumsList'
const axios = require('axios');

export default class Search  extends Component {

        state = {
            allMuseums: [],
            museums: [],
            isLoaded: false,
            searchWord: "",
            searchParameter: ""
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
        return (
            <div>
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


