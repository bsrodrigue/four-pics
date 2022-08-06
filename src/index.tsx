import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GamePage, WelcomePage, UniverseListPage } from './ui/pages'
import GameStateProvider from './context/providers/GameStateProvider'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

ReactDOM.render(
    <div className="wrapper app-container">
        <GameStateProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/game/all" element={<GamePage />} />
                    <Route path="/game/list" element={<UniverseListPage />} />
                </Routes>
            </BrowserRouter>
        </GameStateProvider>
    </div>,
    document.getElementById('root')
)
