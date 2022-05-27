import React from 'react';
import "./Popups.css"

function Rules(props) {

    return (
        <div className={"popup-box"}>
            <div className={"box"} >
                {/*<span className="close" onClick={props.togglePopup}>*/}
                {/*    &times;*/}
                {/*</span>*/}

                <h2>Posraná hlava</h2>
                <article>
                    <h4><em>Pravidla:</em></h4>
                    <p>
                        Každý hráč má 3 druhy balíčků karet po 3 – <strong>ty, co drží v ruce (spodní balík), zakryté (mezi balík) a odkryté (vrchní balík) karty. </strong><br/>
                        Hráč, který je na řadě, se <strong> postupně zbavuje karet v ruce, pak odkrytých a nakonec zakrytých karet.</strong><br/>
                        Ve svém kole odehraje kartu/více karet se stejnou hodnotou, tak aby její <strong> hodnota byla větší než hodnota poslední zahrané karty. </strong><br/>
                        Pokud lízací balík není prázdný a hráč má v ruce míň jak 3 karty, lízne si po odehraném kole kartu – <strong>v ruce má hráč minimálně 3 karty. </strong><br/>
                        Pokud hráč nemůže zahrát žádnou ze svých karet, musí si vzít celý balíček odehraných karet zpět do ruky.<br/>
                        <strong> Vítěz je hráč, který se zbaví karet jako první.</strong><br/>
                    </p>

                    <h4><em>Hodnoty karet:</em></h4>
                    <p><strong>2 >  3 > 4 > 5 > 6 > 7 > 8 > 9 > 10 > J > Q > K > A</strong></p>

                    <h4><em>Speciální pravidla karet:</em></h4>
                    <ul>
                        <li>2 – „žolík“, karta může být zahrána na jakoukoliv kartu / jakákoliv karta může být zahrána na ní</li>
                        <li>7 – pokud byla zahrána 7, další karta musí být menší než 7</li>
                        <li>10 – po zahrání se smaže balík s doposud odehranými kartami</li>
                        <li>Čtyři karty se stejnou hodnotou odehrané za sebou - smaže se balík s doposud odehranými kartami</li>
                    </ul>

                </article>
            </div>
            <div className={"close-outside"}>
                <div className={"close"} onClick={props.togglePopup}>
                        &times;
                </div>
            </div>
        </div>
    );
}

export default Rules;