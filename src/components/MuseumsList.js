import React, {Component} from 'react';
import Museum from './Museum'
import '../App.css'

export default class  MuseumList extends Component  {

    state= {
        museums: this.props.museums,
        isLoaded: false,
    };

/*    componentWillReceiveProps(nextProps){
        this.setState({
            museums: nextProps.museums
        })
    }*/

    static getDerivedStateFromProps(props, state) {
        if (props.museums !== state.museums) {
            return {
                museums: props.museums,
            };
        }
        // Return null to indicate no change to state.
        return null;
    }

    render() {
        return (
            <div>
                <h1>Museums</h1>
                <ul className="museumList">
                    {this.state.museums.map(museum =>
                        <Museum key={museum._id} museum={museum}/>
                    )}
                </ul>
            </div>
        )
    }
}
