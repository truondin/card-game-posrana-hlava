import './App.css';
import Game from "./main/Game";
import {useEffect, useState} from "react";
import Start from "./components/popups/Start";

function App() {
    const [user, setUser] = useState(localStorage.getItem("username"))


    return (
        <div className="App">
            {user == null && <Start setUser={setUser} />}
            <Game username={user} setUser={setUser}/>

        </div>
    );
}

export default App;
