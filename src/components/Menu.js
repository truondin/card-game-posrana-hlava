import React from 'react';
import "./Components.css"

function Menu(props) {
    const logout = () =>{
        localStorage.removeItem("username")
        props.setUsername(null)
    }

    return (
        <nav className={"menu"}>
            <h1>{localStorage.getItem("username") == null? "Posraná hlava":"Hráč: " + props.username}</h1>
            <span className={"menuItem"} onClick={props.togglePopup}>Pravidla</span>
            <span className={"menuItem"} onClick={logout}>Odhlásit</span>
        </nav>
    );
}

export default Menu;