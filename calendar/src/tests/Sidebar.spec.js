import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';

describe('<Sidebar/>', () => {
    it('deve renderizar <Sidebar/>', () => {
        <Router>render(<Sidebar/>)</Router>
    })
})