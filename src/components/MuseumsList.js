import React, {Component} from 'react';
import Museum from './Museum'
const axios = require('axios');
export default class  List extends Component  {

    state= {
        museums: [],
        isLoaded: false,
    };

    componentDidMount() {
        var uri = "http://localhost:3001/api/museums";
        axios
            .get(uri)
            .then(res => {
                console.log(res)
                this.setState({
                    isLoaded: true,
                    museums: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });

    }

    render() {
        return (
            <div>
                <h1>Museums</h1>
                <ul>
                    {this.state.museums.map(museum =>
                        <Museum key={museum._id} museum={museum}/>
                    )}
                </ul>
            </div>
        )
    }
}
