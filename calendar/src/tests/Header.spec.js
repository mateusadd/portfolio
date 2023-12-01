import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/Header/Header';

describe('<Header/>', () => {
    it('deve renderizar <Header/>', () => {
        <Router>render(<Header/>)</Router>
    })
})