import React, {Component} from 'react';
import noteService from '../services/museums'
import Museum from './Museum'

export default class  List extends Component  {

    state= {
        museums: [],
    };

    componentDidMount() {
        noteService.getAll().then(res=>{
            console.log("get all" + res[1].done);
            this.setState({museums: res})
        })
    };


    render() {
        return (
            <div>
                <h1>Museums</h1>
                <ul>
                    {this.state.museums.map(museum =>
                        <Museum key={museum.id} museum={museum}/>
                    )}
                </ul>
            </div>
        )
    }
}
