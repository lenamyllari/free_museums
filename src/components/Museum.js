import React from 'react'


const Museum = ({ museum }) => {
    return (
        <li><h3>{museum.name}</h3>
            <b>Municipality:</b> {museum.city},
            <b>Address: </b>{museum.address},
            <b>WWW:</b> <a href={museum.link}>{museum.link}</a>
        </li>
    )
}

export default Museum
