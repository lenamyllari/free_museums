import React from 'react'
import '../App.css'

const Museum = ({ museum }) => {
    return (
        <li><h3>{museum.name}</h3>

            <b>Address: </b>{museum.address},
            <p><b>WWW:</b> <a href={museum.link}>{museum.link}</a></p>
            {museum.hours && <div><ul className="museumList">
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
            {museum.services.length>0 && <p><b>Services: </b>{museum.services}</p>}
            {museum.themes.length>0 && <p><b>Themes: </b>{museum.themes}</p>}
        </li>
    )
}

export default Museum

// <b>Municipality:</b> {museum.city},
