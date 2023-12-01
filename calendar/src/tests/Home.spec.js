import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../components/Home/Home';

describe('<Home/>', () => {
    it('deve renderizar <Home/>', () => {
        <Router>render(<Home/>)</Router>
    })
})