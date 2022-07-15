import { Link } from "react-router-dom";

export function WelcomePage() {

    return (
        <>
            <img height={300} width={200} src="/img/dancing_1.gif" alt="" />
            <br />
            <h1 className="game-title">OTAPIC</h1>
            <h3 className="guess-name">DEVINE LE NOM DU PERSONNAGE !</h3>
            <br />
            <h4>MODES DE JEU</h4>
            <div className="game-mode-links">
                <Link className="game-mode-link" to="/game/all">TOUS LES MANGAS ET ANIME</Link>
                <Link className="game-mode-link" to="/game/select">CHOISIR UN MANGA OU ANIME</Link>
            </div>
            <br />
            <small>Fait avec &#10084;&#65039; par BADINI Rachid Rodrigue</small>
        </>
    );
}