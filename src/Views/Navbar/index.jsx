import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div>
            <span>Soy el NavBar</span>
            <ul>
                <li>
                    <Link to="/">Brand</Link>
                </li>
                <li>
                    <Link to="/packs">Packs</Link>
                </li>
                <li>
                    <Link to="/marketplace">Marketplace</Link>
                </li>
                <li>
                    <Link to="/news">News</Link>
                </li>
                <li>
                    <Link to="/help">Help</Link>
                </li>
            </ul>
        </div>
    )
}

export default NavBar
