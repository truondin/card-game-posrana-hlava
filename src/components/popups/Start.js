import React from 'react';
import "./Popups.css"

function Start(props) {
    const validate = () => {
        const input = document.querySelector("#username")

        if (input.value.length <= 0){
            input.classList.add("error")
            return false
        }else{
            input.classList.remove("error")
            return true
        }
    }

    const start = () => {
        if (validate()){
            const input = document.querySelector("#username")
            localStorage.setItem("username", input.value)
            props.setUser(input.value)
        }
    }

    return (
        <div className={"popup-box"}>
            <div className={"box start"} >
                {/*<div className={"contentBox"}>*/}
                    <h2>Zadejte své jméno</h2>
                    <input type={"text"} placeholder={"Username"} name="username" className={"input"} id={"username"}/>
                    <button className={"submit"} onClick={start}>START</button>
                {/*</div>*/}
            </div>
        </div>
    );
}

export default Start;