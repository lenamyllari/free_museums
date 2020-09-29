import React from 'react'

const Museum = ({ museum }) => {
    return (
        <li>{museum.name},
            Municipality: {museum.city},
            Address: {museum.address},
            WWW: {museum.link}
        </li>
    )
}

export default Museum
