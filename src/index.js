import React from 'react';
import ReactDOM from 'react-dom/client';
import StronaLogowania from './logowanie';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StronaGlowna from './Planer';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route exact path="/" Component={StronaLogowania} />
        <Route exact path="/planer" Component={StronaGlowna} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

