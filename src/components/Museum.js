import React, {useState} from 'react'
import '../App.css'

const Museum = ({ museum }) => {

    const [readMore, setReadMore] = useState(false)
    const linkName=readMore?'Read less <<':'Read more>>'
    const details = <div>{museum.hours && <div>
        <ul className="museumList">
        <b>Opening hours:</b>
        <li><b>Monday: </b>{museum.hours.monday}</li>
        <li><b>Tuesday: </b>{museum.hours.tuesday}</li>
        <li><b>Wednesday: </b>{museum.hours.wednesday}</li>
        <li><b>Thursday: </b>{museum.hours.thursday}</li>
        <li><b>Friday: </b>{museum.hours.friday}</li>
        <li><b>Saturday: </b>{museum.hours.saturday}</li>
        <li><b>Sunday: </b>{museum.hours.sunday}</li>
        </ul>
        </div>}
        {museum.services.length>0 && <ul className="museumList"><b>Services: </b>{museum.services.map((service, idx)=><li key={idx}>{service}</li>)}</ul>}
        {museum.themes.length>0 && <ul className="museumList"><b>Themes: </b>{museum.themes.map((theme, idx)=> <li key={idx}>{theme}</li>)}</ul>}
        </div>

    return (
        <li><h3>{museum.name}</h3>
            <b>Address: </b>{museum.address},
            <p><b>WWW:</b> <a href={museum.link}>{museum.link}</a></p>
            {(museum.hours || museum.services.length>0 || museum.themes.length>0) && <div>
            <a className="read-more-link" onClick={()=>{setReadMore(!readMore)}}><h3>{linkName}</h3></a>
            {readMore && details}
            </div>}
        </li>
    )
}

export default Museum

// <b>Municipality:</b> {museum.city},
