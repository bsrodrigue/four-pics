import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GamePage, WelcomePage } from './ui/pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <div className='wrapper app-container'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/game/all" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  </div>
  ,
  document.getElementById('root')
);
