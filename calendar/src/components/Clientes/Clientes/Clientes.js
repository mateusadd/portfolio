import './Clientes.css';
import { useEffect, useState } from 'react';
import api from '../../../services/api'
import moment from 'moment';

import Sidebar from '../../Sidebar/Sidebar';
import Header from '../../Header/Header';

function Clientes() {
  return (
    <>
    <Header/>
    <Sidebar/>
    </>
  );
}

export default Clientes;